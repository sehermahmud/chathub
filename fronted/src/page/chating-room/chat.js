import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Chat from '../chat/chat';
import More from '../more/more';
import Safin from '../safin/safin';
import Seher from '../seher/seher';

export default function ChatingRoom() {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <br />
      <Typography variant="h5" style={{ textAlign: 'center' }}>
        Chatting Room
      </Typography>
      <br />
      {matchesMD ? (
        <div>
          <Grid container direction="row">
            <Grid item container direction="column" sm>
              <Chat />
            </Grid>
            <Grid item container direction="column" sm>
              <More />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item container direction="column" sm>
              <Safin />
            </Grid>
            <Grid item container direction="column" sm>
              <Seher />
            </Grid>
          </Grid>
        </div>
      ) : (
        <Grid container direction="row">
          <Grid item container direction="column" sm>
            <Chat />
          </Grid>
          <Grid item container direction="column" sm>
            <More />
          </Grid>
          <Grid item container direction="column" sm>
            <Safin />
          </Grid>
          <Grid item container direction="column" sm>
            <Seher />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
