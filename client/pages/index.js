import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import { Form, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const Index = () => {
  const [courses, setCourses] = useState([]);
  const [final, setFinal] = useState([]);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
      setFinal(data)
      // console.log(data)
    };
    fetchCourses();
  }, []);

  useEffect(() => {

  }, [value])



  const submitHandler = (e) => {
    e.preventDefault()
    setFinal([])
    const temp = courses.filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()) === true)
    console.log(search)
    console.log(temp)
    setFinal(temp)
    setValue((value) => value + 1)
  }



  return (
    <>



      <Form onSubmit={submitHandler}>
        <Form.Row className="align-items-center justify-content-center">
          <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" srOnly>
              Name
            </Form.Label>
            <Form.Control id="inlineFormInputName" placeholder="Search Courses..." onChange={(e) => setSearch(e.target.value)} />
          </Col>
          <Col xs="auto" className="my-1">
            <Button type="submit" onClick={submitHandler}>Search</Button>
          </Col>
        </Form.Row>
      </Form>

      <div className="row">
        <br />
      </div>

      <div className="container-fluid">
        <div className="row">
          {/* {console.log(courses)} */}
          {final.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// export async function getServerSideProps() {
//   const {data} = await axios.get(`${process.env.API}/courses`);
//   return {
//     props: {
//       courses: data,
//     },
//   };
// }

export default Index;
