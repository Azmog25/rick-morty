import './App.css';
import NavigationBar from "./components/NavigationBar";
import Acceuil from "./components/pages/Acceuil";
import {Route, Routes} from "react-router-dom";
import Episodes from "./components/pages/Episodes";
import Favoris from "./components/pages/Favoris";
import PagePersonnage from "./components/pages/PagePersonnage";
import Inscription from "./components/pages/Inscription";
import Connexion from "./components/pages/Connexion";

function App() {
  return (
      <>
          <NavigationBar/>
          <Routes>
              <Route path={"/Inscription"} element={<Inscription/>}></Route>
              <Route path={"/"} element={<Connexion/>}></Route>
              <Route path={"/Accueil"} element={<Acceuil/>}></Route>
              <Route path={"/Episodes/:page"} element={<Episodes/>}></Route>
              <Route path={"/Personnage/:id"} element={<PagePersonnage/>}></Route>
              <Route path={"/PersonnagesFav"} element={<Favoris/>}></Route>
              <Route path={"/Listes"} element={<Episodes/>}></Route>
              <Route path={"/Favoris"} element={<Favoris/>}></Route>
          </Routes>
      </>
  );
}

export default App;
