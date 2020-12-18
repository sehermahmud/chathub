import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';

const URL_seher = 'http://localhost:4000/seher/';
const URL_seher_add = 'http://localhost:4000/seher/add';

export default function Chat() {
  const [seher, setSeher] = useState('');
  const [AllSeher, setAllSeher] = useState([]);

  const AddSeher = (e) => {
    e.preventDefault();

    const newSeher = {
      seher: seher,
    };

    console.log(newSeher);

    axios
      .post(`${URL_seher_add}`, newSeher)
      .then((res) => console.log(res.data));

    window.location.reload(true);
  };

  useEffect(() => {
    getSeher();
  }, []);

  const getSeher = async () => {
    const response = await axios.get(URL_seher);
    setAllSeher(response.data);
  };

  const removeData = (id) => {
    axios.delete(`${URL_seher}/${id}`).then((res) => {
      const del = AllSeher.filter((seher) => seher._id !== id);
      setAllSeher(del);
    });
  };

  const renderedSeher = () => {
    return (
      AllSeher &&
      AllSeher.map(({ _id, seher }) => {
        return (
          <div key={_id}>
            <Card
              elevation={3}
              style={{
                borderRadius: '0.5em',
                background: 'white',
                padding: '1px',
              }}
            >
              <CardContent style={{ padding: '1px' }}>
                <div style={{ flexGrow: 1 }}>
                  <Typography style={{ textAlign: 'left', float: 'left' }}>
                    {seher}
                  </Typography>
                  <button
                    className="btn btn-danger"
                    style={{
                      marginRight: '0.5em',
                      textAlign: 'right',
                      float: 'right',
                    }}
                    onClick={() => removeData(_id)}
                  >
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>
            <br />
          </div>
        );
      })
    );
  };

  return (
    <div>
      <Card
        elevation={3}
        style={{
          borderRadius: '1em',
          marginRight: '0.5em',
          marginleft: '0.5em',
        }}
      >
        <CardContent>
          <div>
            <Card
              elevation={3}
              style={{
                borderRadius: '0.5em',
                background: '#ff4081',
              }}
            >
              <CardContent>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                  Seher
                </Typography>
              </CardContent>
            </Card>
          </div>
          <br />
          <div>
            <Card
              elevation={3}
              style={{
                borderRadius: '0.5em',
                background: '#f85b93',
                padding: '1px',
              }}
            >
              <CardContent style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                {renderedSeher().length > 0 ? (
                  renderedSeher()
                ) : (
                  <div>
                    <Typography variant="h5" style={{ textAlign: 'center' }}>
                      No Data
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <br />
          <form>
            <div className="form-group">
              <label htmlFor="seher">Add</label>
              <input
                type="text"
                className="form-control"
                id="seher"
                placeholder="Add"
                value={seher}
                onChange={(event) => setSeher(event.target.value)}
              />
            </div>
            <button onClick={AddSeher} className="btn btn-primary">
              add
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
