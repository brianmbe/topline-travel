/* eslint-disable react/prop-types */

export default function Button({ children, type }) {
  return <button className={type}>{children}</button>;
}
