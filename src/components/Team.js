import { Link } from "react-router-dom"

function Team()
{
    const teammembers=[{
        name:'Baljeet Kaur', 
        role: 'Founder & CEO', 
        img:'../images/portfolioimg.jpeg'
    }, 
{
    name:'Aryan Sharma', 
    role:'Creative Director', 
    img: '../images/member2.webp'
}, 
{
    name:'Rishabh Sharma', 
    role:'Marketing Head', 
    img:'../images/member3.webp'
}, 
{
    name:'Riya Sharma', 
    role:'Operations Manager', 
    img:'../images/member4.webp'
}, 
{
    name:'Marry Sin', 
    role:'Sales Lead', 
    img:'../images/member5.webp'
}, 
{
    name:'Mariam Sin', 
    role:'Customer Support Head', 
    img:'../images/member6.webp'
}]
    return(
        <>
        <div className="breadcrumbs">
        <div className="container">
          <div className="breadcrumbs-main">
            <ol className="breadcrumb">
              <li>
                <Link to="/homepage">Home</Link>
              </li>
              <li className="active">Our Team</li>
            </ol>
          </div>
        </div>
      </div>
        <section className="teampage">
            <h2 className="teamhead">Meet Our Team</h2>
            <div className="teamcontainer">
                {teammembers.map((member,index)=>(
                    <div className="teamcard" key={index}>
                        <img src={member.img} alt={member.name} className="teamimg"/>
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                        </div>
                ))}
            </div>
        </section>
        </>
    )
}
export default Team