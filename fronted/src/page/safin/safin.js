import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';

const URL_safin = 'http://localhost:4000/safin/';
const URL_safin_add = 'http://localhost:4000/safin/add';

export default function Chat() {
  const [safin, setSafin] = useState('');
  const [AllSafin, setAllSafin] = useState([]);

  const AddSafin = (e) => {
    e.preventDefault();

    const newSafin = {
      safin: safin,
    };

    console.log(newSafin);

    axios
      .post(`${URL_safin_add}`, newSafin)
      .then((res) => console.log(res.data));

    window.location.reload(true);
  };

  useEffect(() => {
    getSafin();
  }, []);

  const getSafin = async () => {
    const response = await axios.get(URL_safin);
    setAllSafin(response.data);
  };

  const removeData = (id) => {
    axios.delete(`${URL_safin}/${id}`).then((res) => {
      const del = AllSafin.filter((safin) => safin._id !== id);
      setAllSafin(del);
    });
  };

  const renderedSafin = () => {
    return (
      AllSafin &&
      AllSafin.map(({ _id, safin }) => {
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
                    {safin}
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
                background: '#7c4dff',
              }}
            >
              <CardContent>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                  Safin
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
                background: '#9670ff',
                padding: '1px',
              }}
            >
              <CardContent style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                {renderedSafin().length > 0 ? (
                  renderedSafin()
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
              <label htmlFor="safin">add</label>
              <input
                type="text"
                className="form-control"
                id="safin"
                placeholder="Add"
                value={safin}
                onChange={(event) => setSafin(event.target.value)}
              />
            </div>
            <button onClick={AddSafin} className="btn btn-primary">
              add
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
