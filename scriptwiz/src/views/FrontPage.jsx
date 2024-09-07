import { useState } from "react";

import style from "../assets/style";

function FrontPage() {
  const [count, setCount] = useState(0);

  return (
    <body className={style.frontPageBody}>
      <h1 className={style.frontPageHeading}>ScriptWiz</h1>
      <div className={style.card}>
        <p>Hello everyone :D</p>
        <button
          className={style.testi}
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </div>
    </body>
  );
}

export default FrontPage;
