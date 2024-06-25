import React, { useState } from "react";
import "./App.css";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NpmPackageDetails from "./PackageDetail";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

function App() {
  const [jsonText, setJsonText] = useState("");
  const [projectDetails, setProjectDetails] = useState(null);
  const [dependencies, setDependencies] = useState(null);
  const [devDependencies, setDevDependencies] = useState(null);
 const [latestVersions, setLatestVersion] = useState(null);

  const handleJsonChange = (event) => {
    setJsonText(event.target.value);
  };

  const parseJson = () => {
    try {
      const parsedJson = JSON.parse(jsonText);
      const {
        name,
        version,
        private: isPrivate,
        dependencies,
        devDependencies,
      } = parsedJson;
      setProjectDetails({ name, version, private: isPrivate });
      setDependencies(dependencies || {});
      setDevDependencies(devDependencies || {});
    } catch (error) {
      alert("Invalid JSON. Please check the input.");
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Package.json Reader</h1>
      </header>
      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Item>
              <textarea
                rows="10"
                cols="50"
                value={jsonText}
                onChange={handleJsonChange}
                placeholder="Paste your package.json content here"
              />
              <Button variant="contained" onClick={parseJson} disableElevation>
                Parse JSON
              </Button>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              {" "}
              {projectDetails && (
                <div>
                  <h2>Project Details</h2>
                  <p>
                    <strong>Name:</strong> {projectDetails.name}
                  </p>
                  <p>
                    <strong>Version:</strong> {projectDetails.version}
                  </p>
                  <p>
                    <strong>Private:</strong>{" "}
                    {projectDetails.private ? "Yes" : "No"}
                  </p>
                </div>
              )}
              {dependencies && (
                <div className="project-details">
                  <h2>Dependencies</h2>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Package Name</TableCell>
                          <TableCell>Version</TableCell>
                          <TableCell>Package Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(dependencies).map(([key, value]) => (
                          <TableRow
                            key={key}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell scope="row">{key}</TableCell>
                            <TableCell scope="row">{value}</TableCell>
                            <TableCell scope="row">
                              <NpmPackageDetails packageName={key} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
              {dependencies && (
                <div className="Project-details">
                  <h2>Dev Dependencies</h2>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>

                          <TableCell>Package Name</TableCell>
                          <TableCell>Version</TableCell>
                          <TableCell>Package Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(devDependencies).map(([key, value]) => (
                          <TableRow
                            key={key}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell scope="row">{key}</TableCell>
                            <TableCell scope="row">{value}</TableCell>
                            <TableCell scope="row">
                              <NpmPackageDetails packageName={key} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
