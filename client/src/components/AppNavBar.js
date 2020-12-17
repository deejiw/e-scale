import React, {useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'


function AppNavBar() {
    const [isOpen, setIsOpen] = useState(false)
    
    function toggle() {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    return (
        <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">ShoppingList</NavbarBrand>
                {/* Handle clicking toggle */}
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {/* Margin Left Auto */}
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/deejiw">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    </div>
    )

}

export default AppNavBar
