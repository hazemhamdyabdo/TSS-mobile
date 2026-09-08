/**
 * TestFlight QA credentials
 *
 * Admin phone: +966 50 123 4567 (enter 501234567) → admin views
 * User phone:  +966 50 765 4321 (enter 507654321) → same views as guest
 * OTP: 12345
 * Invalid login: any other valid SA number
 * Invalid OTP: any code other than 12345
 * Failed create: set name / event name / club name to FAIL
 * Failed profile save: email fail@fencing.sa
 */
export const MOCK_OTP = '12345';
export const SA_DIAL_CODE = '966';
export const MOCK_QA_PHONE = '501234567';
export const MOCK_USER_PHONE = '507654321';
export const MOCK_FAIL_PROFILE_EMAIL = 'fail@fencing.sa';

export function isMockAdminPhone(nationalPhone: string) {
  return nationalPhone === MOCK_QA_PHONE;
}

export function isMockUserPhone(nationalPhone: string) {
  return nationalPhone === MOCK_USER_PHONE;
}

export function isMockQaPhone(nationalPhone: string) {
  return isMockAdminPhone(nationalPhone) || isMockUserPhone(nationalPhone);
}
