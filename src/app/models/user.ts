/**
 * User class for API response
 */
export class User {

  /**
   * User token
   */
  token: string;

  /**
   * User object data
   */
  user: {

    /**
     * User name
     */
    name: string;

    /**
     * User last name
     */
    lastName: string;

    /**
     * USer nick name
     */
    nickName: string;

    /**
     * User email
     */
    email: string;

    /**
     * User uuid
     */
    uuid: string;

    /**
     * User date created at
     */
    createdAt: string;

    /**
     * User date updated at
     */
    updatedAt: string;

    /**
     * User date updated at
     */
    role: string;
  };

  /**
   * Date of expiration token
   */
  expiration: string;
}
