import { useState } from "react";

export function Appointment() {
  const [name, setName] = useState("");
  function handleName(e) {
    setName(e.target.value);
  }
  const [email, setEmail] = useState("");
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  const [phone, setPhone] = useState("");
  function handlePhone(e) {
    setPhone(e.target.value);
  }
  const [date, setDate] = useState("");
  function handleDate(e) {
    setDate(e.target.value);
  }
  const [time, setTime] = useState("");
  function handleTime(e) {
    setTime(e.target.value);
  }
  const [message, setMessage] = useState("");
  function handleMessage(e) {
    setMessage(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      name,
      email,
      phone,
      date,
      time,
      message,
    };
    const data = await fetch("http://localhost:3000/user/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const parsed = await data.json();
    if (data.ok) {
      alert("Appointment sent sucessfully");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setMessage("");
    } else {
      alert("Failed to book appointment!" + parsed.errors[0].msg);
    }
  }
  return (
    <>
      <div
        style={
          {
            // backgroundImage:
            //   'url("https://i.pinimg.com/736x/0e/e6/33/0ee6333097bc3ff577ac21fd385a4b27.jpg")',
            // backgroundSize: "cover", // image cover kare pura div
            // backgroundPosition: "center",
          }
        }
      >
        <h1 style={{ marginLeft: "25%", marginTop: "70px", fontSize: "70px" }}>
          Book Your Appointment
        </h1>
        <div style={{ display: "flex" }}>
          <form
            style={{
              marginTop: "2%",
              width: "50%",
              marginLeft: "13%",
            }}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                onChange={handleName}
                value={name}
                style={{ backgroundColor: "#bde1df", 
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail"
                onChange={handleEmail}
                value={email}
                style={{ backgroundColor: "#bde1df", 
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Phone
              </label>
              <input
                type="phone"
                className="form-control"
                id="exampleInputPhone"
                onChange={handlePhone}
                value={phone}
                style={{ backgroundColor: "#bde1df", 
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleInputDate"
                onChange={handleDate}
                value={date}
                style={{ backgroundColor: "#bde1df", 
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Time
              </label>
              <input
                type="time"
                className="form-control"
                id="exampleInputTime"
                onChange={handleTime}
                value={time}
                style={{ backgroundColor: "#bde1df", 
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Message
              </label>
              <input
                type="message"
                className="form-control"
                id="exampleInputMessage"
                onChange={handleMessage}
                value={message}
                style={{ backgroundColor: "#bde1df", 
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn "
              style={{ backgroundColor: "#b12d51" }}
            >
              Submit
            </button>
          </form>
          <div style={{ paddingTop: "210px" }}>
            <img src="https://i.pinimg.com/736x/86/fd/ca/86fdcaa6ed1dd737acdadc641f821fce.jpg"></img>
          </div>
        </div>
      </div>
    </>
  );
}
