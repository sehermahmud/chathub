import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';

const URL_chat = 'http://localhost:4000/chating/';
const URL_chat_add = 'http://localhost:4000/chating/add';

export default function Chat() {
  const [chat, setChat] = useState('');
  const [allChat, setAllChat] = useState([]);

  const AddChat = (e) => {
    e.preventDefault();

    const newChat = {
      chat: chat,
    };

    console.log(newChat);

    axios.post(`${URL_chat_add}`, newChat).then((res) => console.log(res.data));

    window.location.reload(true);
  };

  useEffect(() => {
    getChat();
  }, []);

  const getChat = async () => {
    const response = await axios.get(URL_chat);
    setAllChat(response.data);
  };

  const removeData = (id) => {
    axios.delete(`${URL_chat}/${id}`).then((res) => {
      const del = allChat.filter((chat) => chat._id !== id);
      setAllChat(del);
    });
  };

  const renderedChat = () => {
    return (
      allChat &&
      allChat.map(({ _id, chat }) => {
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
                    {chat}{' '}
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
                background: '#40c4ff',
              }}
            >
              <CardContent>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                  Chating
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
                background: '#66cfff',
                padding: '1px',
              }}
            >
              <CardContent style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                {renderedChat().length > 0 ? (
                  renderedChat()
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
              <label htmlFor="chat">Add chat</label>
              <input
                type="text"
                className="form-control"
                id="chat"
                placeholder="Chat"
                value={chat}
                onChange={(event) => setChat(event.target.value)}
              />
            </div>
            <button onClick={AddChat} className="btn btn-primary">
              add
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
