from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
import json
import os

# Configuration constants
CREDENTIALS_PATH = "app_credentials.json"
API_PERMISSIONS = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appdata",
]


class DriveAuthenticator:
    def __init__(self, credentials_file: str, token_output: str = "user_token.json"):
        self.credentials_file = credentials_file
        self.token_output = token_output

    def authenticate(self):
        """Generate authentication token using OAuth2"""
        try:
            # Initialize OAuth2 flow
            auth_flow = InstalledAppFlow.from_client_secrets_file(
                self.credentials_file, scopes=API_PERMISSIONS
            )

            # Launch browser authentication
            credentials = auth_flow.run_local_server(port=0)

            # Save token data
            token_data = {
                "token": credentials.token,
                "refresh_token": credentials.refresh_token,
                "token_uri": credentials.token_uri,
                "client_id": credentials.client_id,
                "client_secret": credentials.client_secret,
                "scopes": credentials.scopes,
            }

            with open(self.token_output, "w") as f:
                json.dump(token_data, f, indent=2)

            print(f"Authentication successful - token saved to {self.token_output}")

        except Exception as e:
            print(f"Authentication failed: {str(e)}")
            raise


if __name__ == "__main__":
    auth = DriveAuthenticator(CREDENTIALS_PATH)
    auth.authenticate()
