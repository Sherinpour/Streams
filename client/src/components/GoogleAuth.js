import React, { useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { signIn, signOut } from "../actions/index";
import { connect } from "react-redux";

const GoogleAuth = (props) => {
  const clientId =
    "85647496244-pesaqm4sj0q216f9f3v0gl3qesgnmitv.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          clientId: clientId,
          scope: "email",
        })
        .then(() => {
          var auth = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    };
    gapi.load("client:auth2", initClient);
  });

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      props.signIn(
        window.gapi.auth2.getAuthInstance().currentUser.get().getId()
      );
    } else {
      props.signOut();
    }
  };

  const onSignInClick = () => {
    console.log("Loged In");
  };

  const onSignOutClick = () => {
    console.log("Loged Out");
  };

  return (
    <>
      {props.isSignedIn ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onSignOutClick}
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSignInClick}
          onFailure={onSignOutClick}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
