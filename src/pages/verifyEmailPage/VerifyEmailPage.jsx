import React from "react";

import { BasicPageTemplate } from "../../templates/basicPageTemplate";

export const VerifyEmailPage = () => (
  <BasicPageTemplate>
    <p>Zeby zapisać się na trening musisz aktywować konto.</p>
    <p>Link aktywacyjny został wysłany na podany adres email.</p>
    <p>
      <a>Kliknij</a> zeby wysłać nowy link aktywacyjny.
    </p>
  </BasicPageTemplate>
);
