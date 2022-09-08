import DateUtils from '../../DateUtils';
import Onyx from 'react-native-onyx';
import ONYXKEYS from '../../../ONYXKEYS';

/**
 * Show error modal and optionally a specific error message
 *
 * @param {String} error The error message to be displayed in the modal's body.
 * @param {Boolean} isErrorHtml if @errorModalMessage is in html format or not
 */
function showBankAccountErrorModal(error = null, isErrorHtml = false) {
    Onyx.merge(ONYXKEYS.REIMBURSEMENT_ACCOUNT, {
        errors: {
            [DateUtils.getMicroseconds()]: error,
        },
        isErrorHtml,
    });
}

/**
 * Set the current fields with errors.
 * @param {Object} errorFields
 */
function setPersonalBankAccountFormValidationErrorFields(errorFields) {
    // We set 'errorFields' to null first because we don't have a way yet to replace a specific property without merging it
    Onyx.merge(ONYXKEYS.PERSONAL_BANK_ACCOUNT, {errorFields: null});
    Onyx.merge(ONYXKEYS.PERSONAL_BANK_ACCOUNT, {errorFields});
}

/**
 * Set the current fields with errors.
 *
 * @param {Object} errorFields
 */
function setBankAccountFormValidationErrors(errorFields) {
    // We set 'errors' to null first because we don't have a way yet to replace a specific property like 'errors' without merging it
    Onyx.merge(ONYXKEYS.REIMBURSEMENT_ACCOUNT, {errorFields: null});
    Onyx.merge(ONYXKEYS.REIMBURSEMENT_ACCOUNT, {errorFields});
}

/**
 * Clear validation messages from reimbursement account
 */
function resetReimbursementAccount() {
    setBankAccountFormValidationErrors({});
    Onyx.merge(ONYXKEYS.REIMBURSEMENT_ACCOUNT, {errors: null});
}

export {
    showBankAccountErrorModal,
    setBankAccountFormValidationErrors,
    setPersonalBankAccountFormValidationErrorFields,
    resetReimbursementAccount,
};
