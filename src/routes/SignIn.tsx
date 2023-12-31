import { ChangeEvent, FormEvent, useState } from 'react'
  import reactLogo from '.././assets/react.svg'
  import { signInUser } from '../firebase/firebase'
  import { useNavigate } from 'react-router-dom'
  import { Counter } from '../components/counter'

  const defaultFormFields = {
    email: '',
    password: '',
  }

  function Home() {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields
    const navigate = useNavigate()

    const resetFormFields = () => {
      return (
        setFormFields(defaultFormFields)
      );
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      try {
        // Send the email and password to firebase
        const userCredential = await signInUser(email, password)

        if (userCredential) {
          resetFormFields()
          navigate('/profile')
        }
      } catch (error:any) {
        console.log('User Sign In Failed', error.message);
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setFormFields({...formFields, [name]: value })
    }

    /**
     * <div className="App">
        <div className="card">
          <div className='logo-react'>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <div>
              <button type="submit"> submitt </button>
            </div>
          </form>
        </div>
      </div>
     */

    return(
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" value={email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" value={password} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                      </div>
                      
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                      </p>
                  </form>
              </div>
              
          </div>
      </div>
    </section>
    )
  }

  export default Home