import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';

const URL_more = 'http://localhost:4000/more/';
const URL_more_add = 'http://localhost:4000/more/add';

export default function More() {
  const [more, setMore] = useState('');
  const [AllMore, setAllMore] = useState([]);

  const AddMore = (e) => {
    e.preventDefault();

    const newMore = {
      more: more,
    };

    console.log(newMore);

    axios.post(`${URL_more_add}`, newMore).then((res) => console.log(res.data));

    window.location.reload(true);
  };

  useEffect(() => {
    getMore();
  }, []);

  const getMore = async () => {
    const response = await axios.get(URL_more);
    setAllMore(response.data);
  };

  const removeData = (id) => {
    axios.delete(`${URL_more}/${id}`).then((res) => {
      const del = AllMore.filter((more) => more._id !== id);
      setAllMore(del);
    });
  };

  const renderedMore = () => {
    return (
      AllMore &&
      AllMore.map(({ _id, more }) => {
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
                    {more}
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
                background: '#536dfe',
              }}
            >
              <CardContent>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                  Others
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
                background: '#758afe',
                padding: '1px',
              }}
            >
              <CardContent style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                {renderedMore().length > 0 ? (
                  renderedMore()
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
              <label htmlFor="more">Add More</label>
              <input
                type="text"
                className="form-control"
                id="more"
                placeholder="More"
                value={more}
                onChange={(event) => setMore(event.target.value)}
              />
            </div>
            <button onClick={AddMore} className="btn btn-primary">
              add
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
