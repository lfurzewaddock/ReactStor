const getTokenOrTokens = async (auth, sessionToken, additionalParams = {}) => {
  const responseType = additionalParams.response_type
    || ["id_token", "token"];

  const scopes = additionalParams.scope
    || ["openid", "email", "profile"];

  return auth.token.getWithoutPrompt({
    sessionToken,
    responseType,
    scopes,
    ...additionalParams,
  });
};

const storeTokenOrTokens = (auth, tokenOrTokens) => {
  const tokens = Array.isArray(tokenOrTokens) ? tokenOrTokens : [tokenOrTokens];

  tokens.forEach((token) => {
    if (token.idToken) {
      auth.tokenManager.add("idToken", token);
    } else if (token.accessToken) {
      auth.tokenManager.add("accessToken", token);
    }
  });
};

export default {
  getTokenOrTokens,
  storeTokenOrTokens,
};
