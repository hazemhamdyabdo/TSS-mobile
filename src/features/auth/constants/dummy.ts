/**
 * TestFlight QA credentials
 *
 * Phone: +966 50 123 4567 (enter 501234567)
 * OTP: 12345
 * Invalid login: any other valid SA number
 * Invalid OTP: any code other than 12345
 * Failed create: set name / event name / club name to FAIL
 * Failed profile save: email fail@fencing.sa
 */
export const MOCK_OTP = '12345';
export const SA_DIAL_CODE = '966';
export const MOCK_QA_PHONE = '501234567';
export const MOCK_FAIL_PROFILE_EMAIL = 'fail@fencing.sa';

export function isMockQaPhone(nationalPhone: string) {
  return nationalPhone === MOCK_QA_PHONE;
}
