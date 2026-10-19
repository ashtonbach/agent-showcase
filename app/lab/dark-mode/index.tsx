"use client";

import { useEffect, useState } from "react";

const KEY = "ab-theme";
const MARK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAACrUDmFAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAAAAAAAAPlDu38AAAAHdElNRQfqChMVBBL+L6dDAAAKH0lEQVRo3t1ZeVCV1xX/nfu9Bw+CIAiCuIIadoigRjZFARVZoonRpEmbOmn2TtpJ2zSLTdqm00knjpnM9I/UNMbEpBOXaCOiKI9FETdCRNC4se9PEFnkwVu+e/rHY160ILK8tJ3emfvXd+/5zu/ec+45v3OImfH/PDQ/lGBmhslkgqMOkARBq9FCUZT/LsCWdgM6e7o4LPB++nD7R5xXoB+zUsMNRdHAy9MTIUHBSFgSh6jISHLRufznAe4tyOHvaq7h/VfeRlR4BLb+9QP09vaCiCYklwGAGUQEDw8PLItP5JeefR4LF8TQSLKFI8FVNdUhp6QApd+dR2HZSU6MS6A1K1dDSglmntDEoKkTEXp7e/F1TjY2vfAsvvxqD6tSvatODrtByRL7Cg5za7sBDGB33kEkRC3Gy8+/BL+pvrApMf5btFosaGptQcWFCjS3tEBRFLS2teLNP74FrVbD6x96eFjh5KhH4EL1FX55y1u40X0TRAQhBN746c+xPjl9YrZ5O0irFbX1ddjxxU7e+eUXMBqNkMwImD0HO7dtR2hwyJB/OcREraoVe/IPor2r0+5rVqsVewty0H7zhqPwQaPRYP7cefj9G7+jN379W7jodBBEqK2rxfadn0JKOWSPQwCWX7nIBaUnIW5zdiEELtdV4/DJQocHWq1Gg01PPkUPZ60FDz48eYV61NTVOh6gyWLGLn02um51D3kppZTYX5SL5vY2R2OEs5MTntj4ODwnTwYRoc1gQHnl+SGHOWGAZy6c4xPlpRAkIKXE3BmzERsRA8kSQgjUNDcg+3jeD5IuBc2/nwLmBEBKCYvFgmvVVUPWTAigcaAfu/Kycau/D0QEjaLgsdQsvLD+x/Byn2x74sE4UJyH2uYGhwN0dXGFt9cUeyjp6el1LMDic2e59GI5FKFAlRJhc4OQsjiRwucGU+riREhmCBJoMrRiX1EuOzrvtapW9A8M2F3DSat1HMDuW73Ypc9Gv9kEAHDWarEhJQOe7h4QRHgkOZ38pvjYH4HDJwtxub7aoQANBgPqGxtARFAUBTOmT3ccwPzSE3z+6ndQhIAqVUQHRyApJs7+ygTNCsSauOV2gIbODuzNzxkx6xjrOFqg5+aWZhARJrlNQmRYhGMAdnR1Ym9+DixWCxiAq7MLNqZmYpLrffY1RIR1Satppq+/7cEhgv5sMSquXXaInZZXnuePdmyHqqqQUuKByCiEhYQ6JtDnniriS3VVEEJAShVLIqIRF7lwiPA5/jORtXQlCAQiQmdPF3brs2G2WsYNTFVVnDh1kl957VXU1NWCiODq6oqnfvQk3Nzchqwfcy7a0mHAvsLDUFUVRAR3VzdsTM2Ci7Nu2PWZiSl05HQRVzXWQZDA8XNnUHapgmMjYqi5tQUtra08Gqahqla0trWhqPg4DucdQceNDgghwMx47JFHsTp11bBCxgwwu1jP1U31EIO+tzR6CRaGRt5VQ38fX6xbnoatn28Dg9HT14tdedmICYnEtapr/OIrv4Cx3wi6RyIuWcI0YILZYoYQYtB6JJbGJ+LVX/6KdM7Ow+4bk4nWtTTiwLGjYNjijpf7ZGxIyYSTRjvivrTYJAoOmAcpbcH/VGUZTpSXctyDsbQoOgbd3d3ovdU74uzr64NVtUJRFHtYICLU1dfhwKEcNhqNEwPIzNhflMuNhhZb1sKM1MWJiJwffE/78p7shfXJ6dBqNCDQYIJwAFaW+NlTm+Dn6wedTgcXF5d7TietE5gZqmp7jRuaGrH5nbfxh3f/xD29PUP+PWoTvVJfjUMlBSAiMDN8vbyxPjmdFDG6ckTKong6WKznby5VQBEKyi5VoqC0hNNik+iLv+/gPqMRoyH9ZrMZtfX1KDhWiOJTJbabtVqxfeen0Ol0/OZvXqfbA/6oAKpSxd6CQ9zW2QFl0PbXxK9A0Oy5oz0feLi5Y0NKBi5UX4HFaoHJYsZufTbioxYi+oEFY+aMT2x4DLn6o/znLX9BdW0NAOCTnZ8h5oFozlqTYZc3KhOtrLrMeWeKIYggWWKmrz/WJa2msdZZli54kBaFRkKVKhQhcKHqCvLOFI8rLup0OqzNyKL3392CGdNngJlxq+8WPtqxHd3d3fZ19wRosVqwW38QnT02pk4gZC1NRYD/zDErdZ+LKzamZuE+F1cwM6yqFV8V5OB6Z8d4MAIA4pfE0ovPPAeNRgMhBM5VlKP02zL7od0T4DeXKvjYt6fvoEOZianjLkMsCV9A8ZGL7HTqSn0NDk2QFGelpdO8wLlgZhiNRpw6e9r+bUSA/aYB7MrLRk+freynCAXrlqfB38d33Mo4OzljY2omPNzcwcx2Utx0vXXcMn2n+iIqPMJevbtWXQWr1XpvgCcryvhUZZk9qAYHzENabNKEi0gLgsJpeUys/RbrWhpxYAKkWAiBaX7TALLFxq7ublgslpEB9hr7sDsvG8aBfhAIWo0Gjyanw3uy10Tx2WSlZMDbw2uQFAPZxXmobqoft0yzxQywrUCs0SggQSMDLCo7xWWXK+1kNmp+KJIXJTisBBgeGEQrlywFM0MQofl6G/aPkxSbzWZU19TYyq7M8J3qC2cn57sDvNnTjT36gzBZzDY6pNPh8VUPwcNtkqPwQQiBR1asIT/vqZC3keJLdVVjlnXl2lUur7QlEEIIRISG29O5YQP90TPH+UL1ZSiD2fpkN3cYOjuwvzB30KBGPxaGRNEsP/9hv82fFYj0+BX4+MCXIBK4fvMG9uQf5M2bXqbRNmxMJhM+/uwTGK4bQETw8fZGQmyc/fsQgIbODnxVkAOrqkIIYWfjWz7/25haYZIZs3z9ER0ccdc1BGDtslWUd6aYGwzNEETIP1uCzIQUjg6OuKc7DJhM+PDjbbznn/tARJBSYuWK1Dsq3ENM9FBJPl9tqIUQQ62XiEY9BRHWJq3CnGkzRlRy9rQZeGjZSvu+m71d2K0/CLPl7qTYZDLh/IUKfnXz6/zeB1thMplsMTogEM89/Qw0mu/v7Y4bbDS0YH/RETutGe+QUmL+rABkJKSM6lFKT0imwyWFXNU0SIq/PY3N773DOqkMcYiBgX7UNdSj8uJFtHe022/Ox9sHb732JsL+rT9xB8Cvjx3l+tamCYEDAEVR8PDyNEzznjqq9f7evlibtBpb/7ENAGA0DWBfUS46rzaC1aH9BhBBGXQfKSUC5wTg7dc3I2P1miEHagd4taEGXx87Muh7448GcjCkrB5jQpAWl0SHSvK5svoyhBDQeU6Ci6c7jB1dd7QEGLZeITPDe4o3Vian4Pmnn0FYcOjIJYtLtVU8w3caZvpNH4U6Iw3GhpRMTPHwHNMuH88p+En6euzNzwGIQASYZt2Pnsbr9uYnADg5OWGqz1SEh4QhITYOIUHBpNXevaJg7w+aLWZIyRPpUX6vhEY7LjOXUt5ZcWOAWeJ2RxSKgHYM8h3WAP1fHf8CSx7I3Ys9kZ8AAAAASUVORK5CYII=";
const ORIG = "/ab-mark.svg";

const css = `
.lab-card{max-width:min(720px,100%);margin:8px auto 56px;padding:24px;border:1px solid rgba(176,203,188,.28);border-radius:16px}
.lab-copy{color:var(--mist);margin:0 0 20px;font-size:17px;line-height:1.6}
.lab-toggle{border:0;border-radius:999px;padding:10px 22px;background:var(--sage);color:#14201A;font-family:var(--sans);font-size:15px;font-weight:500;cursor:pointer}
.lab-toggle:focus-visible{outline:2px solid var(--sage);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.lab-toggle{transition:none}}
html[data-theme="light"]{background:#E8EEE9}
html[data-theme="light"] body{color:#14201A;background:#E8EEE9}
html[data-theme="light"] body::before{background:#E8EEE9}
html[data-theme="light"] .brand,html[data-theme="light"] .brand-word,html[data-theme="light"] .demo-title,html[data-theme="light"] h1,html[data-theme="light"] h2,html[data-theme="light"] .lab-copy{color:#14201A}
html[data-theme="light"] .label,html[data-theme="light"] .nav-list a,html[data-theme="light"] .nav-list a:hover,html[data-theme="light"] .nav-list a:focus-visible,html[data-theme="light"] .nav-list a[aria-current="page"],html[data-theme="light"] .site-footer,html[data-theme="light"] .site-disclaimer{color:#2F5A46}
html[data-theme="light"] .nav-list a::after{background:#2F5A46}
html[data-theme="light"] .brand-mark{filter:brightness(0) saturate(100%) invert(22%) sepia(18%) saturate(900%) hue-rotate(100deg)}
html[data-theme="light"] .lab-toggle{background:#2F5A46;color:#E8EEE9}
html[data-theme="light"] .lab-toggle:focus-visible{outline-color:#2F5A46}
html[data-theme="light"] .lab-card{border-color:rgba(47,90,70,.35);background:#F3F6F4}
html[data-theme="light"] .site-header.is-scrolled{background:rgba(232,238,233,.97);border-color:rgba(47,90,70,.22)}
html[data-theme="light"] .skip-link:focus{background:#E8EEE9;color:#14201A}
html[data-theme="light"] main.page [data-lab]{border-top-color:rgba(47,90,70,.22)}
html[data-theme="light"] :focus-visible{outline-color:#2F5A46}
`;

function apply(dark: boolean, persist = true) {
  const root = document.documentElement;
  if (dark) root.dataset.theme = "dark";
  else root.dataset.theme = "light";
  if (persist) localStorage.setItem(KEY, dark ? "dark" : "light");
  const mark = document.querySelector("img.brand-mark") as HTMLImageElement | null;
  if (mark) mark.src = dark ? ORIG : MARK;
}

export default function DarkModeLab() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const isDark = saved !== "light";
    setDark(isDark);
    if (saved === "light" || saved === "dark") apply(isDark, false);
    else {
      delete document.documentElement.dataset.theme;
      const mark = document.querySelector("img.brand-mark") as HTMLImageElement | null;
      if (mark) mark.src = ORIG;
    }
  }, []);

  return (
    <section data-lab="dark-mode" aria-labelledby="lab-dm-title">
      <style>{css}</style>
      <h2 id="lab-dm-title">Appearance</h2>
      <div className="lab-card">
        <p className="lab-copy">
          Switch the whole page between the default forest dark look and a light theme. The choice is saved in this browser.
        </p>
        <button
          type="button"
          className="lab-toggle"
          aria-pressed={dark}
          onClick={() => {
            const next = !dark;
            setDark(next);
            apply(next);
          }}
        >
          {dark ? "Dark theme on" : "Light theme on"}
        </button>
      </div>
    </section>
  );
}
