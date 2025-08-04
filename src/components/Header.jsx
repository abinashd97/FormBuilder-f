import { useState } from "react";
import formLogo from "../assets/formlogo.png";
import { FiEye, FiCode } from "react-icons/fi";
import { togglePreview, toggleJson } from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ userEmail, onLogout }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const dispatch = useDispatch();
  // const { isPreviewOpen, isJSONOpen } = useSelector(state => state.form);

  const handleSave = () => {
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 1500);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-container">
          <div className="left-group">
            <img
              src={formLogo}
              alt="Form Logo"
              className="form-logo"
              style={{ height: "60px", width: "60px" }}
            />
            <div className="form-title-group">
              <span className="form-title">Form Builder</span>
              <span className="form-subtitle">
                Create and customize your form sections
              </span>
              <span className="user-email">Welcome, {userEmail}</span>
            </div>
          </div>
          <div className="button-group">
            <button
              onClick={() => dispatch(togglePreview())}
              className="preview-btn"
            >
              <FiEye style={{ marginRight: 6 }} />
              Preview
            </button>
            <button onClick={() => dispatch(toggleJson())} className="json-btn">
              <FiCode style={{ marginRight: 6 }} />
              JSON
            </button>
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {showPrompt && <div className="save-prompt">Form saved!</div>}
      </header>
    </>
  );
};

export default Header;
