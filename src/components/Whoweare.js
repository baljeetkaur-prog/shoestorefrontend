import { Link } from "react-router-dom";

function Whoweare()
{
    return(
        <>
        <div className="breadcrumbs">
				<div className="container">
					<div className="breadcrumbs-main">
						<ol className="breadcrumb">
							<li><Link to="/homepage">Home</Link></li>
							<li className="active">Who We Are</li>
						</ol>
					</div>
				</div>
			</div>
            <div className="ckeckout">
                <div className="container">
        <section class="whoweare">
        <div className="whocontainer">
            <div className="whocontent">
                <div className="whoimage">
                    <img src="./images/whoweare.webp" alt="shoeimage"/>
                </div>
                <div className="whotext">
                    <p className="intro">
                         At <strong>FreeStyle</strong>, we’re more than just a shoe store — we’re a movement. 
  Born out of a passion for style and comfort, we handcraft each design to inspire confidence, 
  empower self-expression, and provide unmatched quality for every step you take. 
  Our journey began with a simple idea: that fashion should be fearless, functional, and for everyone.
  With a diverse range of shoes for both women and men, FreeStyle merges cutting-edge design with all-day comfort, 
  giving your feet the attention and flair they deserve. <br/>
From classic sneakers and sporty kicks to elegant heels and bold statement pieces, every pair tells a story. 
  Whether you're striding through city streets, embracing weekend adventures, or making an entrance on the runway,
  we've got your back (and your feet). Our collections are designed to cater to every lifestyle, mood, and moment — 
  making FreeStyle the ultimate destination for those who walk with confidence and live without limits. 
  We believe your style should reflect your spirit — unique, free, and unstoppable.
  </p>

                </div>
            </div>
        </div>
        </section>
        </div>
        </div>
        </>
    )
}
export default Whoweare; 