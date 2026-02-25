import json
from oauth2client.client import OAuth2WebServerFlow, flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import run_flow

# Path to your OAuth2 client_id.json file
CLIENT_SECRET_FILE = 'client_secret.json'

# The scope for the Google Drive API
SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.appdata']

def get_token_oauth2client():
    # Load the client secrets from the JSON file
    flow = flow_from_clientsecrets(CLIENT_SECRET_FILE, scope=SCOPES)

    # Run the authentication flow and retrieve credentials
    storage = Storage('token_oauth2client.json')
    credentials = run_flow(flow, storage)

    with open('generated_token.json', 'w') as token_file:
        token_file.write(credentials.to_json())



    print("Token information saved to generated_token.json")

if __name__ == '__main__':
    get_token_oauth2client()