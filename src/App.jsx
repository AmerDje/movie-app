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
    <>
      <h1>Function Component</h1>
      <Card />
    </>
  );
};

const Card = () => {
  return <h1>Card</h1>;
};
export default App;
