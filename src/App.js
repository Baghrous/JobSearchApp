import React from "react";
import { Layout } from "antd";
import Toolbar from "./components/Toolbar";
import JobList from "./components/JobList";
import "./App.css";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <h1 className="title">Job Listings</h1>
      </Header>
      <Content className="container">
        <Toolbar />
        <JobList />
      </Content>
    </Layout>
  );
}

export default App;
