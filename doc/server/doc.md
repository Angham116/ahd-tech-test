## Back-End (database)
 - I didnt made database, I have stored data in constants.

## Back-End (End Points)

`POST` : `/v1/signup`

- body:

  ```
  {
    firstName,
    lastName,
    email,
    Password,
  }
  ```

- response: - on failed:

      		1- when there is no email, password, firstName or lastName:

      				{
      					status: 400,
      					msg: 'All fields are required'
      				}

      		2- when the email is already exist:

      				{
      					status: 400,
      					msg: 'User doesnt exist'
      				}

      	- on success:

      			{
      				status: 200,
      				msg: 'Welcome'
      			}

`POST` : `/v1/login`

- body:

  ```
  {
    email,
    Password
  }
  ```

  - response: - on failed:

    1- when there is no email or password:

    {
      status: 400,
      msg: 'All fields are required'
    }

    2- when the email doesnt exist:
    {
      status: 400,
      msg: 'User doesnt exist'
    }

    3- when the password isn't correct
      {
        status: 400,
        msg: 'incorrect password'
      }

    - on success:
      {
        status: 200,
        msg: 'Welcome'
      }


