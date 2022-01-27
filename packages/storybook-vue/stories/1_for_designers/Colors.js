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
    jsxArray.push(<Colors counter={i}></Colors>);
  }
  return <div>{jsxArray}</div>;
}

function renderTokens() {
  let jsxArray = [];
  for (let i = 0; i < getHeaderLength(); i++) {
    jsxArray.push(<Token counter={i}></Token>);
  }
  return <div>{jsxArray}</div>;
}

function renderUse() {
  let jsxArray = [];
  for (let i = 0; i < getHeaderLength(); i++) {
    jsxArray.push(<Use counter={i}></Use>);
  }
  return <div>{jsxArray}</div>;
}

function renderContrast() {
  let jsxArray = [];
  for (let i = 0; i < getHeaderLength(); i++) {
    jsxArray.push(<Contrast counter={i}></Contrast>);
  }
  return <div>{jsxArray}</div>;
}

function renderHex() {
  let jsxArray = [];
  for (let i = 0; i < getHeaderLength(); i++) {
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

export function Colors({ counter }) {
  return color_table.map((category) => {
    return (
      <tr>
        {category[getHeader(counter)].map((item) => {
          return (
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
          );
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
            {category[getHeader(counter)].map((item) => {
              return (
                <div>
                  <tr style={{ height: `${item.colorsHeight}px` }}>
                    {item.token}
                  </tr>
                </div>
              );
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
        {category[getHeader(counter)].map((item) => {
          return (
            <div>
              <tr style={{ height: `${item.colorsHeight}px` }}>{item.use}</tr>
            </div>
          );
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
          {category[getHeader(counter)].map((item) => {
            return (
              <div
                style={{
                  marginBottom: '65px',
                }}
              >
                {item.contrast.first ? (
                  <td>
                    <span
                      style={{
                        backgroundColor: `${item.colors}`,
                        borderRadius: '4px',
                        color: `${item.contrast.first}`,
                        padding: '5px',
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
                        borderRadius: '4px',
                        color: `${item.contrast.second}`,
                        padding: '5px',
                      }}
                    >
                      AA
                    </span>
                  </td>
                ) : null}
              </div>
            );
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
        {category[getHeader(counter)].map((item) => {
          return (
            <div>
              <tr style={{ height: `${item.colorsHeight}px` }} id="demo">
                {item.hex}
              </tr>
            </div>
          );
        })}
      </tr>
    );
  });
}
