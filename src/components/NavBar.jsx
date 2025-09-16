export const NavBar = () => {
  return (
    <div className="navBar">
      <div className="siteNameNav">SynthFolio</div>
      <div className="mySynthsNav">My Synths</div>
      <div className="collectorsNav">Collectors</div>
      <div className="synthCatalogueNav">Synth Catalogue</div>
      <div className="createASynthNav">Create A Synth</div>
      <div className="logoutNav">
        <p>Current User</p>
        <p>Sign Out</p>
      </div>
    </div>
  );
};
