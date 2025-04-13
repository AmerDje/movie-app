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
    <>
      <h1>Function Component</h1>
      <Card
        title="Star Wars"
        year="1977"
        actors={[
          { name: "Mark Hamill", age: 42 },
          { name: "Harrison Ford", age: 79 },
        ]}
      />
      <Card
        title="Avatar"
        year="2009"
        actors={[
          { name: "Sam Worthington", age: 40 },
          { name: "Zoe Saldana", age: 36 },
          { name: "Sigourney Weaver", age: 65 },
        ]}
      />
      <Card
        title="Lion King"
        year="1994"
        actors={[
          {
            name: "Natalie Portman",
            age: 30,
          },
        ]}
      />
    </>
  );
};

//props are passed in as an object to the component
const Card = ({ title, year, actors }) => {
  return (
    // when using props they should be between {}
    <>
      <h2>{title}</h2>
      <p>{year}</p>
      {actors.map((actor) => (
        <p>{actor.name}</p>
      ))}
    </>
  );
};
export default App;
