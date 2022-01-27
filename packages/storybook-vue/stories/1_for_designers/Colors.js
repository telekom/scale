import React from 'react';
import color_table from '../color_table.json';

function getHeader(topicNumber) {
  const json = color_table[0];
  const key = Object.keys(json)[topicNumber];
  return String(key);
}

function getHeaderLength() {
  const json = color_table[0];
  return Object.keys(json).length;
}

//TODO: Remove relatively same code for render functions

function renderColors() {
  let jsxArray = [];
  for (let i = 0; i < getHeaderLength(); i++) {
    jsxArray.push(<Header counter={i} item={'colors'}></Header>);
    jsxArray.push(<hr></hr>);
    jsxArray.push(<Colors counter={i}></Colors>);
  }
  return <div>{jsxArray}</div>;
}

function renderTokens() {
  let jsxArray = [];
  for (let i = 0; i < getHeaderLength(); i++) {
    jsxArray.push(<Header counter={i} item={'token'}></Header>);
    jsxArray.push(<hr></hr>);
    jsxArray.push(<Token counter={i}></Token>);
  }
  return <div>{jsxArray}</div>;
}

function renderUse() {
  let jsxArray = [];
  for (let i = 0; i < getHeaderLength(); i++) {
    jsxArray.push(<Header counter={i} item={'use'}></Header>);
    jsxArray.push(<hr></hr>);
    jsxArray.push(<Use counter={i}></Use>);
  }
  return <div>{jsxArray}</div>;
}

function renderContrast() {
  let jsxArray = [];
  for (let i = 0; i < getHeaderLength(); i++) {
    jsxArray.push(<Header counter={i} item={'contrast'}></Header>);
    jsxArray.push(<hr></hr>);
    jsxArray.push(<Contrast counter={i}></Contrast>);
  }
  return <div>{jsxArray}</div>;
}

function renderHex() {
  let jsxArray = [];
  for (let i = 0; i < getHeaderLength(); i++) {
    jsxArray.push(<Header counter={i} item={'hex'}></Header>);
    jsxArray.push(<hr></hr>);
    jsxArray.push(<Hex counter={i}></Hex>);
  }
  return <div>{jsxArray}</div>;
}

export default function ColorHelper({ functionCall }) {
  switch (functionCall) {
    case 'colors':
      return renderColors();
    case 'token':
      return renderTokens();
    case 'use':
      return renderUse();
    case 'contrast':
      return renderContrast();
    case 'hex':
      return renderHex();
  }
}

export function Header({ counter, item }) {
  return color_table.map((category) => {
    return (
      <tr>
        {category[getHeader(counter)].map((part) => {
          return (
            <div>
              <h6 style={{ marginBottom: '-100px', fontWeight: 'bold' }}>
                {part.description[item]}
              </h6>
            </div>
          );
        })}
      </tr>
    );
  });
}

export function Colors({ counter }) {
  return color_table.map((category) => {
    return (
      <tr>
        {category[getHeader(counter)].map((part) => {
          return part.variants.map((item) => {
            return (
              <div>
                <div
                  style={{
                    backgroundColor: `${item.colors}`,
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      marginLeft: '100px',
                      marginRight: '100px',
                      marginTop: '7px',
                      marginBottom: '7px',
                    }}
                  >
                    <tr
                      style={{
                        height: `${item.colorsHeight}px`,
                        color: 'black',
                      }}
                    ></tr>
                  </div>
                </div>
              </div>
            );
          });
        })}
      </tr>
    );
  });
}

export function Token({ counter }) {
  return (
    <tr>
      {color_table.map((category) => {
        return (
          <tr>
            {category[getHeader(counter)].map((part) => {
              return part.variants.map((item) => {
                return (
                  <div>
                    <tr style={{ height: `88px` }}>
                      <p style={{ fontSize: '12px' }}>{item.token}</p>
                    </tr>
                  </div>
                );
              });
            })}
          </tr>
        );
      })}
    </tr>
  );
}

export function Use({ counter }) {
  return color_table.map((category) => {
    return (
      <tr>
        {category[getHeader(counter)].map((part) => {
          return part.variants.map((item) => {
            return (
              <div>
                <tr style={{ height: `90px` }}>
                  <p style={{ fontSize: '12px' }}>{item.use}</p>
                </tr>
              </div>
            );
          });
        })}
      </tr>
    );
  });
}

export function Contrast({ counter }) {
  {
    return color_table.map((category) => {
      return (
        <tr>
          {category[getHeader(counter)].map((part) => {
            return part.variants.map((item) => {
              return (
                <div
                  style={{
                    marginBottom: '66px',
                    marginTop: '8px',
                  }}
                >
                  {item.contrast.first ? (
                    <td>
                      <span
                        style={{
                          backgroundColor: `${item.colors}`,
                          borderRadius: '8px',
                          color: `${item.contrast.first}`,
                          padding: '0px 5px 0px 5px',
                          fontSize: '12px',
                        }}
                      >
                        AAA
                      </span>
                    </td>
                  ) : null}
                  {item.contrast.second ? (
                    <td
                      style={{
                        color: 'black',
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: `${item.colors}`,
                          borderRadius: '8px',
                          color: `${item.contrast.second}`,
                          padding: '0px 5px 0px 5px',
                          fontSize: '12px',
                        }}
                      >
                        AA
                      </span>
                    </td>
                  ) : null}
                </div>
              );
            });
          })}
        </tr>
      );
    });
  }
}

export function Hex({ counter }) {
  return color_table.map((category) => {
    return (
      <tr>
        {category[getHeader(counter)].map((part) => {
          return part.variants.map((item) => {
            return (
              <div>
                <tr style={{ height: `90px` }} id="demo">
                  <p style={{ fontSize: '12px' }}>{item.hex}</p>
                </tr>
              </div>
            );
          });
        })}
      </tr>
    );
  });
}
