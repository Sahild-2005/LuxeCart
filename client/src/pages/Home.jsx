import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            NEW COLLECTION 2026
          </span>

          <h1>
            Style that speaks
            <br />
            for itself.
          </h1>

          <p>
            Discover carefully selected fashion essentials
            designed for modern everyday living.
          </p>

          <Link to="/products" className="primary-btn">
            Explore Collection →
          </Link>

        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85"
            alt="LuxeCart fashion collection"
          />
        </div>

      </section>

      <section className="features">

        <div>
          <h3>Curated Products</h3>
          <p>
            Quality products selected for modern lifestyles.
          </p>
        </div>

        <div>
          <h3>Fast Delivery</h3>
          <p>
            Reliable delivery with a simple shopping experience.
          </p>
        </div>

        <div>
          <h3>Secure Shopping</h3>
          <p>
            Built with a secure and reliable technology stack.
          </p>
        </div>

      </section>
    </>
  );
}

export default Home;