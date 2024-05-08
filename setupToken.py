import base64
import http.client
import json


def read_env_variable(file_path, variable_name):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            if line.startswith(variable_name):
                return line.split('=')[1].strip()
    return None


def get_spotify_token():
    client_id = read_env_variable('.env.local', 'SPOTIFY_CLIENT_ID')
    client_secret = read_env_variable('.env.local', 'SPOTIFY_CLIENT_SECRET')

    if not client_id or not client_secret:
        raise Exception(
            "Client ID or Client Secret is not defined in .env.local")

    # Prepare the authorization header
    auth_header = base64.b64encode(
        f"{client_id}:{client_secret}".encode()).decode()

    # Create connection to Spotify Accounts service
    connection = http.client.HTTPSConnection("accounts.spotify.com")
    headers = {
        'Authorization': f'Basic {auth_header}',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    body = 'grant_type=client_credentials'

    # Make the POST request
    connection.request("POST", "/api/token", body, headers)
    response = connection.getresponse()

    if response.status == 200:
        data = response.read()
        token_info = json.loads(data)
        return token_info['access_token']
    else:
        error_data = response.read()
        raise Exception(
            f"Failed to retrieve token: {response.status} {response.reason} {error_data}")


# Example usage
try:
    token = get_spotify_token()
    print("Access Token:", token)
except Exception as e:
    print(str(e))
