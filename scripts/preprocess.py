import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib
import logging
from pathlib import Path


class WeatherDataPreprocessor:
    def __init__(self, input_file: str, output_file: str):
        self.input_file = input_file
        self.output_file = output_file
        self.scaler = StandardScaler()
        self.numerical_cols = [
            "Temperature Min (°C)",
            "Temperature Max (°C)",
            "Wind Speed (m/s)",
            "Humidity (%)",
            "Pressure (hPa)",
        ]

        # Setup logging
        logging.basicConfig(
            level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
        )
        self.logger = logging.getLogger(__name__)

    def load_data(self) -> pd.DataFrame:
        """Load and validate the input data"""
        try:
            df = pd.read_csv(self.input_file)
            required_columns = set(self.numerical_cols)
            if not required_columns.issubset(df.columns):
                missing = required_columns - set(df.columns)
                raise ValueError(f"Missing required columns: {missing}")
            return df
        except FileNotFoundError:
            self.logger.error(f"Input file {self.input_file} not found")
            raise
        except Exception as e:
            self.logger.error(f"Error loading data: {str(e)}")
            raise

    def handle_missing_values(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Handle missing values in the dataset using a multi-step approach.
        
        Args:
            df (pd.DataFrame): Input DataFrame with potentially missing values
            
        Returns:
            pd.DataFrame: DataFrame with handled missing values
        """
        # Log initial missing value statistics
        missing_stats = df[self.numerical_cols].isnull().sum()
        self.logger.info(
            f"Missing values before handling:\n{missing_stats}"
        )
    
        # Apply forward-backward fill strategy
        processed_df = df.copy()
        processed_df[self.numerical_cols] = (
            df[self.numerical_cols]
            .fillna(method="ffill")
            .fillna(method="bfill")
        )
    
        # Apply mean imputation if any missing values remain
        if processed_df[self.numerical_cols].isnull().any().any():
            column_means = df[self.numerical_cols].mean()
            processed_df[self.numerical_cols] = processed_df[self.numerical_cols].fillna(column_means)
    
        return processed_df
    
    def scale_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Scale numerical features using the initialized scaler.
        
        Args:
            df (pd.DataFrame): Input DataFrame with unscaled features
            
        Returns:
            pd.DataFrame: DataFrame with scaled features
            
        Raises:
            Exception: If scaling operation fails
        """
        try:
            scaled_df = df.copy()
            scaled_df[self.numerical_cols] = self.scaler.fit_transform(df[self.numerical_cols])
    
            # Persist scaler for later use
            scaler_path = "weather_scaler.joblib"
            joblib.dump(self.scaler, scaler_path)
            
            return scaled_df
        
        except Exception as e:
            self.logger.error(f"Error in scaling features: {str(e)}")
            raise

    def process(self):
        """Main processing pipeline"""
        try:
            self.logger.info("Starting data preprocessing...")

            # Load data
            df = self.load_data()
            self.logger.info(f"Loaded data with shape: {df.shape}")

            # Handle missing values
            df = self.handle_missing_values(df)

            # Scale features
            df = self.scale_features(df)

            # Save processed data
            df.to_csv(self.output_file, index=False)
            self.logger.info(f"Processed data saved to {self.output_file}")

            return df

        except Exception as e:
            self.logger.error(f"Error in preprocessing pipeline: {str(e)}")
            raise


if __name__ == "__main__":
    preprocessor = WeatherDataPreprocessor(
        "data/raw_data.csv", "data/processed_data.csv"
    )
    processed_df = preprocessor.process()
