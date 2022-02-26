import React, { useMemo, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import userTableMock from "../../../../app/modules/Auth/__mocks__/userTableMock"
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import Moment from 'moment';
import { getNewAccessToken } from '../../../../app/modules/Network/Services'


const jwt = require('jsonwebtoken');



export function Footer() {
  const dispatch = useDispatch();
  const [timeExpire, setTimeExpire] = useState("");
  const [isExpire, setIsExpire] = useState(false);
  const [currentTime, setCurrentTime] = useState((new Date().getTime() / 1000));
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const [openExpire, setOpenExpire] = React.useState(false);

  function handleRenewAccessToken() {
    validateTimeExpire()
    if (!isExpire) {
      getNewAccessToken(user)
        .then(res => res.json())
        .then((result) => {
          if (result.httpstatus === "OK") {
            user.accessToken = result.resultados.accessToken
            userTableMock.pop(userTableMock.find(u => u.username === user.username))
            userTableMock.push(user);
            const updatedUser = Object.assign(user, {
              accessToken: result.resultados.accessToken,
            });
            // user for update preparation
            dispatch(user.setUser(updatedUser));
            setOpenExpire(false);
          }
        }
        )
    }
    else {
      setOpenExpire(false)
    }

  }

  function handleCloseExpire() {
    setOpenExpire(false);
  }

  function validateTimeExpire() {
    Moment.locale('en');
    var decodedToken = jwt.decode(user.accessToken, { complete: true });
    decodedToken.payload.exp = decodedToken.payload.exp * 1000
    var dateNow = new Date();
    var time = dateNow.getTime()
    setTimeExpire(Moment(decodedToken.payload.exp).format('HH:mm:ss'))

    if ((decodedToken.payload.exp < time) && !isExpire) {
      setIsExpire(true)
    }
    else if ((decodedToken.payload.exp - 30000 < time) && !isExpire && !openExpire) {
      setOpenExpire(true)
    }
    else if (!isExpire) {
      setCurrentTime(Moment(time).format('HH:mm:ss'))
    }
  }

  useEffect(() => {
    setTimeout(() => {
      validateTimeExpire();
    }, 1000);
  });



  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true)
    };
  }, [uiService]);

  return (
    <>
      {isExpire && !openExpire && <Redirect to='/logout' />}
      <Dialog
        open={openExpire}
        onClose={handleCloseExpire}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {<FormattedMessage id="APP.NAME" />}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage id="APP.EXPIRE_SESSION" />
            <br />
            <FormattedMessage id="APP.EXPIRE_TIME" /> {timeExpire}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenewAccessToken} color="primary">
            <FormattedMessage id="APP.BUTTON.OK" />
          </Button>
          <Button onClick={handleCloseExpire} color="default">
            <FormattedMessage id="APP.BUTTON.CANCEL" />
          </Button>
        </DialogActions>
      </Dialog>
      <div
        className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
        id="kt_footer"
      >
        <div
          className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
        >
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted font-weight-bold mr-2">{today.toString()}</span> &copy;{" "}
            <a
              href="http://localhost:9001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-75 text-hover-primary"
            >
              Grain Chain - {currentTime.toString()}
            </a>
          </div>
          {}
        </div>
      </div>
    </>
  );
}
