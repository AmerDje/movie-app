import "./App.css";

//there are two types of components

/* //Class Component
//Not recommended to use
class App extends React.Component {
  render() {
    return <h1>Class Component</h1>
  }
}*/

//Function component
/*
function App() {
  return (
 <h1>Function Component</h1> 
  );
}*/

const App = () => {
  return (
    //when multiple must have a parent element which is now a fragment <> or regular div
    //when you're passing props, values that are expressions (like arrays, objects, or variables) should be wrapped in curly braces ({}). This is because the curly braces tell React that you're passing JavaScript expressions as props rather than static values (like strings).
    // in a nutshell props are always passed between {} excepts if they are a plain string
    <div className="card-container">
      <h1>Function Component</h1>
      <Card title="Star Wars" year="1977" />
      <Card title="Avatar" year="2009" />
      <Card title="Lion King" year="1994" />
    </div>
  );
};

//props are passed in as an object to the component
const Card = ({ title, year }) => {
  return (
    // when using props they should be between {}
    <div
      className="card"
      // style={{
      //   border: "1px solid #4b5362",
      //   padding: "20px",
      //   margin: "10px",
      //   backgroundColor: "#31363f",
      //   borderRadius: "10px",
      //   minHeight: "100px",
      // }}
    >
      <h2>{title}</h2>
      <p>{year}</p>
    </div>
  );
};
export default App;
