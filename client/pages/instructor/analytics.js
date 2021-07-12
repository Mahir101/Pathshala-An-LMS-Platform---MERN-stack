import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { CardDeck, Card } from 'react-bootstrap'
import { Bar, Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Java', 'Python', 'C', 'C#', 'Rust'],
  datasets: [
    {
      label: '# of Students',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  width: "400",
  height: "400",
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const dataDoughnut = {
  labels: ['Java', 'Python', 'C', 'C#', 'Rust'],
  datasets: [
    {
      label: '# ৳ of the course',
      data: [1200, 1090, 3000, 5000, 2000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    loadCourses();
    getInstructor();
  }, []);

  const getInstructor = async () => {
    try {
      const { data } = await axios.get("/api/get-instructor");
      console.log("INSTRUCTOR ROUTE => ", data);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <InstructorRoute>
      <div className="row">
        <br />
      </div>

      <CardDeck>
        <Card bg='secondary'>
          <Card.Body>
            <Card.Title>Total Courses</Card.Title>
            <Card.Text>
              <h1>{courses.length}</h1>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg='light'>
          <Card.Body>
            <Card.Title>Total Enrolled Students</Card.Title>
            <Card.Text>
              <h1>87</h1>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg='info'>
          <Card.Body>
            <Card.Title>Total Income</Card.Title>
            <Card.Text>
              <h1>৳ {user.money}</h1>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>

      <div className="row">
        <br />
      </div>
      <div className="row">
        <br />
      </div>

      <div className='justify-content-center'>
        <h2 className='justify-content-center text-align:center'>Enrolled Students by Course</h2>
      </div>
      <div className="row">
        <br />
      </div>
      <div style={{ position: "relative", margin: "auto", width: "50vw" }}>
        <Bar height={0.09}
          width={0.15} data={data} options={options} />
      </div>

      <div className="row">
        <br />
      </div>
      <div className="row">
        <br />
      </div>



      <div className='justify-content-center'>
        <h2 className='justify-content-center text-align:center'>Income % by Course</h2>
      </div>
      <div className="row">
        <br />
      </div>
      <div style={{ position: "relative", margin: "auto", width: "40vw" }}>
        <Doughnut data={dataDoughnut} options={{
          responsive: true,
          maintainAspectRatio: true,
        }} />
      </div>

      <div className="row">
        <br />
      </div>
      <div className="row">
        <br />
      </div>
    </InstructorRoute>
  );
};

export default InstructorIndex;
