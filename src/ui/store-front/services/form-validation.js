import React from "react";

const checkValidity = (value, rules = []) => {
  // eslint-disable-next-line no-debugger
  // debugger;
  const errors = rules.reduce((result, ruleDefinition) => {
    const error = checkRules(value, ruleDefinition);
    if (error) result.push(error);
    return result;
  }, []);

  return errors;
};

const checkRules = (value, ruleDefinition) => {
  // eslint-disable-next-line no-debugger
  // debugger;
  // Shallow copy
  const localRuleDefinition = {
    ...ruleDefinition,
  };
  const { rule } = localRuleDefinition;
  let { feedback } = localRuleDefinition;
  // Split ruleDefinition.rule by colon to handle minStringLength:8, maxStringLength:16, etc.
  const ruleId = rule.split(":")[0];
  const ruleOpts = rule.split(":")[1];

  if (typeof feedback === "string" && !feedback.length > 0) {
    feedback = "failed validation";
  }
  // Allow the use of comma character in string when escaped with double backslash
  // eslint-disable-next-line no-useless-escape
  const prepFeedbackString = feedback.replace(/\\?\,/g, function replaceBackslashComma(t) { return t === "," ? "\u000B" : ","; });
  localRuleDefinition.feedback = prepFeedbackString.split("\u000B").toString();

  switch (ruleId) {
    case "required":
      if (value.trim().length === 0) return localRuleDefinition;
      break;
    case "isEmail":
      /* eslint-disable */
      const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
      /* eslint-enable */
      if (!value.trim().match(emailRegex)) return localRuleDefinition;
      break;
    case "minStringLength":
      // TODO - handle var types and empty vars
      if (value.trim().length < ruleOpts) return localRuleDefinition;
      break;
    case "maxStringLength":
      // TODO - handle var types and empty vars
      if (value.trim().length > ruleOpts) return localRuleDefinition;
      break;
    default:
      return {
        rule: "UNKNOWN",
        feedback: "Warning: validator rule handler does not exist!",
      };
  }

  return null;
};

const addOrUpdateFormErrors = (formErrObjArray, key, errors) => {
  // deep copy 'formErrObjArray' array
  const localFormErrObjArray = JSON.parse(JSON.stringify(formErrObjArray));
  const localFormError = {
    [key]: errors,
  };
  // add/update error object using field key
  const index = localFormErrObjArray.findIndex(fieldErrors => fieldErrors[key]);
  if (index === -1) {
    localFormErrObjArray.push(localFormError);
  } else {
    localFormErrObjArray.splice(index, 1, localFormError);
  }

  return localFormErrObjArray;
};

const removeFormErrors = (formErrObjArray, key) => {
  // deep copy 'formErrObjArray' array
  const localFormErrObjArray = JSON.parse(JSON.stringify(formErrObjArray));
  // remove error
  const index = localFormErrObjArray.findIndex(fieldErrors => fieldErrors[key]);
  if (index !== -1) {
    localFormErrObjArray.splice(index, 1);
  }

  return localFormErrObjArray;
};

const prepareErrorFeedback = (formErrObjArray, key) => {
  const listErrors = formErrObjArray.map((fieldErrors) => {
    let accumulator = [];
    Object.getOwnPropertyNames(fieldErrors).forEach((localKey) => {
      const fieldError = fieldErrors[localKey];
      accumulator = fieldError.map(
        error => <li className="content" key={`${key}_${error.rule}`}>{error.feedback}</li>,
      );
    });
    return accumulator;
  });

  if (listErrors.length > 0) {
    return <ul className="list">{listErrors}</ul>;
  }
  return "";
};

export default {
  checkValidity,
  addOrUpdateFormErrors,
  removeFormErrors,
  prepareErrorFeedback,
};
