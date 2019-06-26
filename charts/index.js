import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const SimpleLineChart = ({ state }) => {
  const data = state.data;
  return (
    <LineChart
      margin={{ top: 50, right: 50, left: 50 }}
      width={800}
      height={500}
      data={data}
    >
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" type="number" />
      <YAxis yAxisId="right" type="number" orientation="right" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line yAxisId="left" type="monotone" dataKey="value" stroke="#8884d8" />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="clarity"
        stroke="#82ca9d"
      />
      <Line yAxisId="right" type="monotone" dataKey="ambiguity" stroke="#000" />
    </LineChart>
  );
};

const getUrlParameter = name => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

//mocks from db
//digital-canada-ca
//service-dashboard

const prefixEndPoint = () => {
  if (location && location.port && location.port === "1234") {
    //for local testing
    return "http://localhost:3000";
  }
};

const endPoint = `${prefixEndPoint()}/scores/${getUrlParameter("reponame")}`;

const Header = () => {
  return (
    <div
      style={{ width: "100%", backgroundColor: "#000", padding: "20px 50px" }}
    >
      <img
        height="52px"
        src="https://cds-accessibility-handbook.herokuapp.com/stylesheets/images/svg/cds-lockup-ko-en.svg"
      />
    </div>
  );
};

function App() {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(endPoint);
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: "flex", margin: "20px 40px" }}>
        <cds-tag bkd-color="#f90277" text="Alpha" class="hydrated" />
      </div>
      <div style={{ display: "flex", margin: "30px" }}>
        <h1 style={{ margin: "0 50px 0", display: "inline-block" }}>
          Performance Index - {getUrlParameter("reponame")}
        </h1>
      </div>
      <SimpleLineChart state={data} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("container"));
