import logo from '../asset/IIFL_Logo.svg';
import './header.css';

const Header = ({ showFilters }) => {
    return (
        <>
            <div className='logo_header'>
                <div className='header'>
                    <img alt='logo' src={logo} />
                    <div>Playbook</div>
                </div>
            </div>

        </>
    )
}
export default Header;