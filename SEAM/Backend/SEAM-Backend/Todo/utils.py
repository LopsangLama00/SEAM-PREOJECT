import random
import string
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


def generate_random_string(size=10, chars = string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))





def decode_jwt_token(token):
    try:
        # Decode the token
        untyped_token = UntypedToken(token)

        # Get the payload from the token
        payload = untyped_token.payload

        # Extract the user ID
        user_id = payload.get('user_id')

        return user_id
    except TokenError as e:
        raise InvalidToken(e.args[0])