// import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/users/UserProfileHome";
import { EditUserProfile } from "../components/users/EditUserProfile";
import { Collectors } from "../components/users/Collectors";
import { NonCurrentUserProfile } from "../components/users/NonCurrentUserProfile";
import { SynthCatalogue } from "../components/synths/SynthCatalogue";
import { SynthDetail } from "../components/synths/SynthDetail";
import { CreateASynth } from "../components/synths/CreateASynth";
import { EditSynth } from "../components/synths/EditSynth";
import { SiteHomeWelcome } from "../components/landing/SiteHome";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<SiteHomeWelcome />} />
      <Route path="home" element={<Home />} />
      <Route path="edit-profile" element={<EditUserProfile />} />
      <Route path="collectors" element={<Collectors />} />
      <Route path="collector/:userId" element={<NonCurrentUserProfile />} />
      <Route path="catalogue" element={<SynthCatalogue />} />
      <Route path="synth-detail/:synthId" element={<SynthDetail />} />
      <Route path="create" element={<CreateASynth />} />
      <Route path="edit-synth" element={<EditSynth />} />
    </Routes>
  );
};
