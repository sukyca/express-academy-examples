/*
Remember this is GraphQL error formatter used for REST API.
So take the following explanation as it is written for GraphQL
Example: resolver === endpoint

Explanation: error object returned for each resolver should be:
{
  code: XXX,
  message: 'Description of the error.',
  key: 'UNKNOWN_ERROR'
}
On frontend you should use key, code is more of a status code
somewhat similar to http response code.
*/

const ERROR_BAD_REQUEST = 'BAD_REQUEST';
const ERROR_PAGE_NOT_FOUND = 'PAGE_NOT_FOUND';
const ERROR_JSON_BODY_MALFORMED = 'JSON_BODY_MALFORMED';

const ERROR_UNAUTHORIZED = 'UNAUTHORIZED';
const ERROR_NO_API_ACCESS_KEY_ID = 'NO_API_ACCESS_KEY_ID';
const ERROR_NO_API_SECRET_ACCESS_KEY = 'NO_API_SECRET_ACCESS_KEY';

const ERROR_INVALID_AUTHENTICATION_TOKEN = 'INVALID_AUTHENTICATION_TOKEN';
const ERROR_INVALID_AUTHENTICATION_TOKEN_BAD_FORMAT = 'INVALID_AUTHENTICATION_TOKEN_BAD_FORMAT';
const ERROR_INVALID_CORS_POLICY = 'INVALID_CORS_POLICY';
const ERROR_INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
const ERROR_AUTHENTICATION_TOKEN_HAS_EXPIRED = 'AUTHENTICATION_TOKEN_HAS_EXPIRED';
const ERROR_AUTH_VALID_BUT_LENDER_DATA_MISSING = 'AUTH_VALID_BUT_LENDER_DATA_MISSING';
const ERROR_AUTHENTICATION_DATA_IS_MISSING = 'AUTHENTICATION_DATA_IS_MISSING';
const ERROR_INVALID_TOKEN_FORMAT = 'INVALID_TOKEN_FORMAT';
const ERROR_ENDPOINT_DISABLED = 'ENDPOINT_DISABLED';
const ERROR_CANT_UPDATE_DATA_TO_DATABASE = 'CANT_UPDATE_DATA_TO_DATABASE';
const ERROR_CANT_CREATE_AUDIT_DATA = 'CANT_CREATE_AUDIT_DATA';

const ERROR_DATE_FORMAT_IS_INVALID = 'DATE_FORMAT_IS_INVALID';
const ERROR_NOT_SUPPORTED_USE_OF_ENDPOINT = 'NOT_SUPPORTED_USE_OF_ENDPOINT';

// Claims
const ERROR_AUTH_VALID_BUT_CLAIM_DMS_ID_MISSING = 'AUTH_VALID_BUT_CLAIM_DMS_ID_MISSING';
const ERROR_AUTH_VALID_BUT_UNKNOWN_MECHANIC = 'AUTH_VALID_BUT_UNKNOWN_MECHANIC';
const ERROR_AUTH_VALID_BUT_UNKNOWN_CLAIM_DMS_ID = 'AUTH_VALID_BUT_UNKNOWN_CLAIM_DMS_ID';

const ERROR_AUTH_VALID_BUT_CLAIM_CLASS_MISSING = 'AUTH_VALID_BUT_CLAIM_CLASS_MISSING';
const ERROR_AUTH_VALID_BUT_CLAIM_NUMBER_MISSING = 'AUTH_VALID_BUT_CLAIM_NUMBER_MISSING';
const ERROR_AUTH_VALID_BUT_CLAIM_MESSAGE_MISSING = 'AUTH_VALID_BUT_CLAIM_MESSAGE_MISSING';
const ERROR_AUTH_VALID_BUT_CLAIM_DATETIME_MISSING = 'AUTH_VALID_BUT_CLAIM_DATETIME_MISSING';

const ERROR_AUTH_VALID_BUT_CLAIM_KEY_MISSING = 'AUTH_VALID_BUT_CLAIM_KEY_MISSING';
const ERROR_AUTH_VALID_BUT_CLAIM_ADDITIONAL_VALUES_MISSING = 'AUTH_VALID_BUT_CLAIM_ADDITIONAL_VALUES_MISSING';
const ERROR_AUTH_VALID_BUT_CLAIM_FILE_REFERENCE_MISSING = 'AUTH_VALID_BUT_CLAIM_FILE_REFERENCE_MISSING';
const ERROR_AUTH_VALID_BUT_CLAIM_FILE_MISSING = 'AUTH_VALID_BUT_CLAIM_FILE_MISSING';
const ERROR_AUTH_VALID_BUT_CLAIM_FILE_MIME_TYPE_MISSING = 'AUTH_VALID_BUT_CLAIM_FILE_MIME_TYPE_MISSING';
const ERROR_AUTH_VALID_BUT_CLAIM_FILENAME_MISSING = 'AUTH_VALID_BUT_CLAIM_FILENAME_MISSING';

const ERRORS = {
  // ##################################################################

  BAD_REQUEST: {
    code: 400,
    message: 'Bad request, possibly due malformed body.',
  },

  JSON_BODY_MALFORMED: {
    code: 400,
    message: 'Body parser is unable to parse JSON request body.',
  },

  PAGE_NOT_FOUND: {
    code: 404,
    message: '404 Page not found.',
  },

  // ##################################################################

  NO_API_ACCESS_KEY_ID: {
    code: 400,
    message: 'Missing API_ACCESS_KEY_ID!',
  },

  NO_API_SECRET_ACCESS_KEY: {
    code: 400,
    message: 'Missing API_SECRET_ACCESS_KEY!',
  },

  UNAUTHORIZED: {
    code: 401,
    message: 'Invalid API_ACCESS_KEY_ID or API_SECRET_ACCESS_KEY!',
  },

  // ##################################################################

  DATE_FORMAT_IS_INVALID: {
    code: 400,
    message: 'Date format is invalid, please pass the valid date formatted string.',
  },

  NOT_SUPPORTED_USE_OF_ENDPOINT: {
    code: 400,
    message: 'You are not using the endpoint in desired way, please provide aditional parameters.',
  },

  // ##################################################################

  // Token provided is invalid.
  INVALID_AUTHENTICATION_TOKEN: {
    code: 401,
    message: 'Invalid authentication token.',
  },

  INVALID_AUTHENTICATION_TOKEN_BAD_FORMAT: {
    code: 401,
    message: 'Bad format of JWT authentication token. Did you maybe miss \'Bearer \' before \'ey...\' in the request header ?',
  },

  // Invalid CORS policy.
  INVALID_CORS_POLICY: {
    code: 401,
    message: 'Invalid Cross-origin resource sharing (CORS) policy.',
  },

  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal server error.',
  },

  // User data is missing when using provided auth token.
  AUTHENTICATION_DATA_IS_MISSING: {
    code: 401,
    message: 'Authentication data is missing.',
  },

  // Token has expired
  AUTHENTICATION_TOKEN_HAS_EXPIRED: {
    code: 440,
    message: 'Your session has timed out. Please authenticate again.',
  },

  // Token is valid but unknown user
  AUTH_VALID_BUT_LENDER_DATA_MISSING: {
    code: 401,
    message: 'Token is valid but the lender assigned to the token does not exist.',
  },

  // User has no roles set
  USER_HAS_NO_ROLE: {
    code: 401,
    message: 'You should have permissions, to have access to this action.',
  },

  // CLAIMS
  AUTH_VALID_BUT_CLAIM_DMS_ID_MISSING: {
    code: 500,
    message: 'Token is valid but the claim dms id is missing.',
  },

  AUTH_VALID_BUT_UNKNOWN_MECHANIC: {
    code: 500,
    message: 'Token is valid but user should provide either claimIdDMS or (claimClass and claimNo).',
  },

  AUTH_VALID_BUT_UNKNOWN_CLAIM_DMS_ID: {
    code: 500,
    message: 'Token is valid but claim dms id is unknown (Reported claim is not reported via this instance of application).',
  },

  AUTH_VALID_BUT_CLAIM_CLASS_MISSING: {
    code: 500,
    message: 'Token is valid but the claim class is missing.',
  },

  AUTH_VALID_BUT_CLAIM_NUMBER_MISSING: {
    code: 500,
    message: 'Token is valid but the claim number is missing.',
  },

  AUTH_VALID_BUT_CLAIM_MESSAGE_MISSING: {
    code: 500,
    message: 'Token is valid but the claim message is missing.',
  },

  AUTH_VALID_BUT_CLAIM_DATETIME_MISSING: {
    code: 500,
    message: 'Token is valid but the claim datetime is missing.',
  },

  AUTH_VALID_BUT_CLAIM_KEY_MISSING: {
    code: 500,
    message: 'Token is valid but the claim key is missing.',
  },

  AUTH_VALID_BUT_CLAIM_ADDITIONAL_VALUES_MISSING: {
    code: 500,
    message: 'Token is valid but the claim additional values are missing.',
  },

  AUTH_VALID_BUT_CLAIM_FILE_REFERENCE_MISSING: {
    code: 500,
    message: 'Token is valid but the claim file reference is missing.',
  },

  AUTH_VALID_BUT_CLAIM_FILE_MISSING: {
    code: 500,
    message: 'Token is valid but the claim file is missing.',
  },

  AUTH_VALID_BUT_CLAIM_FILE_MIME_TYPE_MISSING: {
    code: 500,
    message: 'Token is valid but the claim file mimetype is missing.',
  },

  AUTH_VALID_BUT_CLAIM_FILENAME_MISSING: {
    code: 500,
    message: 'Token is valid but the claim file original filename is missing.',
  },

  // ##################################################################

  // Password recovery token has expired
  RECOVERY_TOKEN_HAS_EXPIRED: {
    code: 440,
    message: 'Recovery link is invalid or has expired.',
  },

  // ##################################################################

  RESOLVER_ONLY_FOR_SUPER_ADMINS: {
    code: 401,
    message: 'This resolver is only for super admins.',
  },

  RESOLVER_ONLY_FOR_ADMINS: {
    code: 401,
    message: 'This resolver is only for admins and super admins.',
  },

  USER_HAS_NO_ACCESS: {
    code: 401,
    message: 'Your account does not have access to this action.',
  },

  WHILE_LOOKING_FOR_SPECIFIC_USER: {
    code: 409,
    message: 'Error while looking for specific user in database.',
  },

  NO_SPECIFIC_USER_OR_PASSWORD_COMBINATION: {
    code: 410,
    message: 'Invalid username or password!',
  },

  MORE_THAN_ONE_USER_OR_PASSWORD_COMBINATION_FOUND: {
    code: 411,
    message:
      'Found more than one specific user or password combination. Please contact administrator.',
  },

  ACCOUNT_IS_LOCKED: {
    code: 412,
    message: 'Account is locked for security purposes. Please contact administrator.',
  },

  ACCOUNT_IS_LOCKED_TOO_MANY_FAILED_ATTEMPTS: {
    code: 413,
    message: 'Account is locked because of too many failed attempts. Please contact administrator.',
  },

  // ##################################################################

  NO_SPECIFIC_USER_FOUND: {
    code: 410,
    message: 'Invalid username!',
  },

  MORE_THAN_ONE_USER_FOUND: {
    code: 411,
    message: 'Found more than one specific user! Please contact administrator.',
  },

  // ##################################################################

  ENDPOINT_DISABLED: {
    code: 404,
    message: 'Resolver disabled.',
  },

  // ##################################################################

  // In situations where provided applicationToken is in invalid format.
  INVALID_TOKEN_FORMAT: {
    code: 400,
    message: 'Invalid token format.',
  },

  // ##################################################################

  CANT_UPDATE_DATA_TO_DATABASE: {
    code: 500,
    message: "Can't update data.",
  },

  CANT_CREATE_AUDIT_DATA: {
    code: 500,
    message: "Can't create audit data.",
  },

  // ##################################################################

  // Any error not defined in ERRORS object.
  UNKNOWN_ERROR: {
    code: 500,
    message: 'Unknown server error.',
  },
};

const errorDescriptor = (error) => {
  let lookingForError = `${error}`;
  if (typeof ERRORS[lookingForError] === 'undefined') {
    lookingForError = 'UNKNOWN_ERROR';
  }

  const objToReturn = {
    ...ERRORS[lookingForError],
    key: lookingForError,
  };

  return JSON.stringify(objToReturn);
};

module.exports = {
  ERRORS,
  errorDescriptor,

  ERROR_BAD_REQUEST,
  ERROR_PAGE_NOT_FOUND,
  ERROR_JSON_BODY_MALFORMED,

  ERROR_UNAUTHORIZED,
  ERROR_NO_API_ACCESS_KEY_ID,
  ERROR_NO_API_SECRET_ACCESS_KEY,

  ERROR_INVALID_AUTHENTICATION_TOKEN,
  ERROR_INVALID_AUTHENTICATION_TOKEN_BAD_FORMAT,
  ERROR_INVALID_CORS_POLICY,
  ERROR_INTERNAL_SERVER_ERROR,
  ERROR_AUTHENTICATION_TOKEN_HAS_EXPIRED,
  ERROR_AUTH_VALID_BUT_LENDER_DATA_MISSING,

  ERROR_AUTHENTICATION_DATA_IS_MISSING,
  ERROR_INVALID_TOKEN_FORMAT,
  ERROR_ENDPOINT_DISABLED,
  ERROR_CANT_UPDATE_DATA_TO_DATABASE,
  ERROR_CANT_CREATE_AUDIT_DATA,

  ERROR_DATE_FORMAT_IS_INVALID,
  ERROR_NOT_SUPPORTED_USE_OF_ENDPOINT,

  // Claims
  ERROR_AUTH_VALID_BUT_CLAIM_DMS_ID_MISSING,
  ERROR_AUTH_VALID_BUT_UNKNOWN_MECHANIC,
  ERROR_AUTH_VALID_BUT_UNKNOWN_CLAIM_DMS_ID,

  ERROR_AUTH_VALID_BUT_CLAIM_CLASS_MISSING,
  ERROR_AUTH_VALID_BUT_CLAIM_NUMBER_MISSING,
  ERROR_AUTH_VALID_BUT_CLAIM_MESSAGE_MISSING,
  ERROR_AUTH_VALID_BUT_CLAIM_DATETIME_MISSING,

  ERROR_AUTH_VALID_BUT_CLAIM_KEY_MISSING,
  ERROR_AUTH_VALID_BUT_CLAIM_ADDITIONAL_VALUES_MISSING,
  ERROR_AUTH_VALID_BUT_CLAIM_FILE_REFERENCE_MISSING,
  ERROR_AUTH_VALID_BUT_CLAIM_FILE_MISSING,
  ERROR_AUTH_VALID_BUT_CLAIM_FILE_MIME_TYPE_MISSING,
  ERROR_AUTH_VALID_BUT_CLAIM_FILENAME_MISSING,
};
