import Logo from "../images/slumbr_logo2.jpg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataContext from "../utils/DataContext";

export function Login() {
  
  const context = useContext(DataContext);
  console.log('MyComponent context IN LOGIN:', context);

  const {email, password, setPassword, setEmail, setPatient, setGender, setCity, setState, setLoading, setPatientId } = useContext(DataContext);
  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
  setEmail(e.target.value);
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const loginResponse = await axios.post('/api/healthcare/login', {
      email: email,
      password: password,
    });

    if (loginResponse.status === 200) {
      const patientId = loginResponse.data.patientId;
      localStorage.setItem('patientId', patientId);
      localStorage.setItem('email', email);
      setPatientId(patientId);

      try {
        const patientResponse = await axios.get(`/api/healthcare/patient/${patientId}`);

        setPatient(`${patientResponse.data.name[0].given[0]} ${patientResponse.data.name[0].family}`);
        setGender(patientResponse.data.gender);
        setCity(patientResponse.data.address[0].city);
        setState(patientResponse.data.address[0].state);
        localStorage.setItem("firstName", patientResponse.data.name[0].given[0]);
        navigate('/home');
        console.log(patientResponse.data);
      } catch (err) {
        setError(err.response?.data || "Error fetching patient");
      } finally {
        setLoading(false);
      }
    }
  } catch (error) {
    if (error.response) {
      console.log('Server responded with error data:', error.response.data.message);
      alert(error.response.data.message);
    } else {
      console.error("Network error:", error);
      alert("Network error, please try again.");
    }
  }
};


  return (
    <section className="m-20 flex pt-10 gap-4">
      <div className="w-2/5 mt-20  h-full hidden lg:block md:block sm:block">
        <img src={Logo} className="h-full w-full object-cover rounded-3xl" alt="logo" />
      </div>

      <div className="w-full lg:w-3/5 mt-15 md:w-1/5">
        <div className="text-center"> 
          <Typography variant="h4" className="font-bold mb-4">
            Login
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Login
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <Input
              size="lg"
              value = {email}
              onChange={handleEmail} 
              placeholder="yourname@domain.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your Password
            </Typography>
            <Input
              type="password"
              size="lg"
              value = {password} 
              onChange={handlePassword}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button
            type="submit"
            className="mt-6 dark:bg-linear-to-r from-neutral-950 via-orange-950 to-neutral-900"
            fullWidth
          >
            Login
          </Button>

          {/* <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">Forgot Password</a>
            </Typography>
          </div>
          <div className="space-y-4 mt-8">
          </div> */}
          {/* <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Not registered?
            <Link to="/signup" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography> */}
        </form>
      </div>
    </section>
  );
}

export default Login;
