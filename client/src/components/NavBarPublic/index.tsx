import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/bicicleta2.webp";
import { CiLogin } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";

export function NavBarPublic() {
    const navigate = useNavigate();
    
    const onClickEntrar = () => {
        navigate("/login");
    };

    return (
        <div className="bg-white shadow-sm mb-2">
        <div className="container">
            <nav className="navbar navbar-light navbar-expand">
            <Link to="/" className="navbar-brand">
                <img src={logo} width="60" alt="Logo" />
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <NavLink
                        to="/"
                        className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/cart"
                        className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        <div className="d-flex align-items-center">
                        <FiShoppingCart />
                        <span className="ml-5">Carrinho</span>
                        </div>
                    </NavLink>
                </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item" onClick={onClickEntrar}>
                    <NavLink
                        to="/"
                        className={(navData) =>
                        navData.isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        <div className="d-flex align-items-center">
                        <CiLogin />
                        <span className="ml-5">Entrar</span>
                        </div>
                    </NavLink>
                </li>
                
            </ul>
            </nav>
        </div>
        </div>
    );
}
