import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import Posts from "./Posts";

const UserProfile = ({ username, profilePicture, bio, followerCount }) => {
  const [isFollowing, setFollowStatus] = useState(false);
  const [followerC, setFollowerCount] = useState(followerCount);

  const posts = [
    {
      id: 1,
      title: "Post Title 1",
      image: "../Asset/image.jpg",
      likes: 10,
      comments: 5,
    },
    {
      id: 2,
      title: "Post Title 2",
      image: "../Asset/image.jpg",
      likes: 20,
      comments: 8,
    },
    // Add more post objects as needed
  ];

  const handleFollow = () => {};

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="user-profile">
          <div className="profile-details">
            <header>
              <h1>Adam</h1>
            </header>
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVEhYZGRgYGBgYGBgYGhgaGhgZGBgZGhoYGBgcIS4lHB4rIRkYJjgmKy8xNTU3GiQ7QDs1Py40NTEBDAwMEA8QHhISHzQrJCs2NDY0NDY0NzQ0NDQ0NjQ0NDQ0NDY0NDQ0NDQ0NDY0NDQ2NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEgQAAEDAgMEBwYDBQUFCQAAAAEAAhEDIQQSMQVBUWETIjJxgZGhBhRCsdHwUmLBFSNykuEHJIKi4haywtLxMzRDU2Rzk5TT/8QAGwEAAwEBAQEBAAAAAAAAAAAAAQIDAAQFBgf/xAAxEQACAgEDAwMDAwMEAwAAAAAAAQIRAwQSITFBURMUYQVxoSKBkTLB8BWx4fEjQlL/2gAMAwEAAhEDEQA/AOVDICiWq05igWL3Ez5pTKxamyqwWJZUyH3gMqWVHypsiY28DlT5UbKllRoG4DlSyo2VLImDYGEoRujS6MohVgMqbKj9EmNNFNB5AlqaEcsUCxHg3IGEoRC1RLUyDZAhMpEJQjQ1gymKIQowtQUwZTEIhCjC1DJkITEKZCYhAdMgU0IkKMIhsgQoohCaEaGsgmU4TQiNZGEoUkljWQyJKaS1h3M6VzFE011WL2O6JIFt8iVmOwsLxseeMlwcM9Hkg6Zj9GkKS1fd0ugVVkFWCXczOgKXu61OhS6FN6g6wGcKCfoFo9Cl0S28usSM7oeSfo1oGko9Em3jLGij0abo1eNNRLEVMb00UTTUTTV401BzE6kB4yiWKLmK66kd487ITmJlISUCk5ig9mnGL+Z/RXCxZlLFZqrmZY3A/wAM/P8ARCWaMZJPuzRwuSbXZEi1RIVh7EMhdCZzdARCYhEIUCEbCmQTEImVRLVh0yCiQiQmhYKYOEyJCYrBsgQolqIVEhEdMgQmhEhNCIbIQlClCUIWGxoSUoSWBZ6c+ghGgusxGzmu0EKm7ZZ3ua3xXyMNXFo9aWkf3Oedhu5DNFdCdms31W+An9eaf9ks3vf35Mo83WV1qo/4hPas5zoUuiXRHBYYdp7vAtM/ygobhhhox7u8x8j+ipHU30T/AIN7eurRg9EkaS3RiKY7NBviZ/RJ2Of8LGN7mhMs0n2/JvRj5/BiNwrndlpPcCfkiN2bUIkMMfe7Vab8ZVPxeQH0Vd73nV7vMp1Ob8B9KC8srnY79+nER/xEKD9mNFy9sDUl2vc1oPzRHUihmgnUpd2DbFdIlY0WCTnHIBjjP8+iDUyCILzxFmR3RPyCuHDoTsOqxkvJOSfZFF2SeqwxAkOdv3xlhBqETLWADgSStI4VD923Kimibi3/ANGa+ZkADuC5zAYUe8vAHYzkX55b8bErtGYUkwub2TQzYt7d5D7G3xyoZpx3w+GPixvbL5LD6SgaHJbRwsggiCoCgIg+a7PWRyvBZi+7JjhlrlgAhAfATrI2I8MUZvuyH0Kuveq73p4yZGSiiq6mVHKivcUMhUQlrsQypi1ThMQiFMHlTQiQmhGxtwOE0IsKMLWZSIQmhEhKFrDuIQki5UkLBuPe7IT6QO4eN0fKkQvz2LaPrLM6sHDQxyEN+ULOqMkybrdfSlVnYRduLNFdSc4buhj9HyTigeC1hgUVuGKt7mPYRYV3McYcqQoLbbhgp+6BFaob0oruYIw6f3dbnuSf3NN7hB2R8mD7sl7pO5bpwnJQOHR9wFY4eTDfhEM4VbrqKBVaAmjnbD6MDFOE4oD8ON/mtDE4iDYKjVxU7oXRFyZyzUIg3UgSPmuH2K7+9kk6hx0A1Dnff9V2FSq7WTa64XY7j7yBki1+sDFiPGZ9UZpqcbEjJOLo7Oo9vFVKz+CT2FV3MXfGKRwyyNgKjigvnirLmITmKyaOaVsqPaguYrrmIbqaopEZRZScxRLVbcxQdTTqRLa0VYTZUcsUSxHcACWpsqKWpsq24O4FCUImVNlRsO4HlTwpQllWs1kYSU8qdbcaz33KmyKZTL86WRn1dkYTQpEJiqKVoYjlUwEwTgJ0wMkApghQAUgeQVIsVj5h9wmzj7ITeAUSR+H5fRUQKGfUO6PMKtVqO5eY+qOQ38Kg6m38Pz+qpGkUXHYoOLuI/mb9VWqsdy/mb9Vqmk37n6oL8O37J+hVY5IrsaVswqlA8v5m/VVn0O7zC6B2Ebx9f9KC7Z44/wCb/Srx1EUQlhbOZxlOGPPBjzqNzSfFchgT/endq5Z8EfG0XvbX/povRNtYFraLzLuyG2LSZeQwRMX6y4HC0z7zVJbWht9BIyvaTn0EWvv8ddLPGUk12NHA4xa8nRvw55eYQHUDwXQv2WZi/wB+KC/Zg3n7811rVR8nK9LLwc86geSG6hxI9VvPwDBvVd9Bg3OPn9FWOoT6EpYGupiuoD8Xp/VDdRHH0/qtV9No0YfP+iA9vBsKkcrZKWJGaaPf5f1UHUe/yWg5hQXUxx9U6yEpQRRdRUHUlecxvFQLAqLISeNFF1NQNPkr5HJQLSisgjgikafJRNNXSwqJppvUBsKRYmyK50aY01vUA4FTKkrXR8k63qITaz2/OlmQ5Slfne4+t2hE6FKQciptAoPlUgxCa5Ta9Vjm8itMmGKQYk1ymCrRyom2xujS6NEBSVVNA3MCaQ4KJpjgrBUCn3BUmANMcFB1McAjOUHBK5DpsAaY4KLmBFKG4JN5RNnNe2eNZRw81JgvZZhh5yuz9XhdguvKqG12CrUqFjy17XNhjspbmcYglokRAIm9+S6f+1wM6SgB28j5OvUzDII7y8zyXn9agWgOzWgaiIJvGveu3Ek4pvuLOb6I90wz21KbKgcCHsa8EGe00H9UOqGcz4LJ/s6osdgGFmuepnm/7wOieUtDDHNdG7C/d0vqqMmm2FpyVpIyHlu5vnCrPJ/CFsvwg4/NAdhPu6tDUQISxSZivae7uAVd9M81tvwnMeqA7C/d10R1MSEsMu5jOoqBpLXdhkJ2HVFqF5JPAZTqKGcOtY4dQOHKb3C8iPAZJw6iaC1ThyoGiUy1HyI8Bme79yY0CtI0VE0kfcA9EzuhPD1UTRK0TTUeiR9wB4ih0B5pLQ6NOt7gHoo9LzJSq+dSDl8J6iPotoeU8oAepBy3qIXaHBUgUAOUw5b1EK4hwiNcq7XqYenWZE3Esh6fMq4cE+dOs4m0PnTFwVc1Uxrplqmu4djDlQcgHEoZxQ3o+6sZQkGchuQXYkLC9qfaP3SkHta17nPyhrnFvwuOaQ0zEC1u9PDK5yUY9WUUWlbOE9ta3vGLcxru09mHFrt+Dycajz5LuPbzCdJga7R8LA8cujcHn/K0jxXlmE2wRiKVSoWkU3h4LutOVxczOWgFxk6wPKy67F+3zHsew9HD2uaZbUNnAj5FejkhNONLoLuiuo39l2MH76jxDKwjcSMj/wDdZz1XoErwr2e22/C1W1GjMGhwyF4aHBwywXBpIAse8Bey4LHtqU2VBAzsY+AZAzNBgGBOusBc+uUoS39mUwvcqRccVFxQ3VghmsOK873DR0rH8BSAoEKBqjioGqOKZar5D6SfYmRzQ3Ux9wmNQcVHOEy1fyb26YzqQ+whOwwRC9RLwmWsl5N7WLBHChROFajF6jmTrWS8gejh4BHCtUThh9hGJUSUy1kvIr0afYrnDDl5KLsMOAVmUxTrWS8ivRLwVfdQkrCSPvX5F9gjH/2/og3a4i4OWCRH8RErptm7VbWptqUzZ24kS3k4AmHcl4eKMkS8T4z8oWpsvHvpkDpqgYBAa1zg25v1ZjyuUmb6bjcf/G6f7sSOot8rg9oFZMMa3NlnrZc0flmJ815fV28W3zOMxJMumLRfyUP229wGR0OAi4bmA4Xv5FccfpkqvcXc8d1Z6w3EjSVJuKB0M9y8pO2MVuc8yN0kx4eKE/aNVoAdmnTt8NZA1K0fps31mhHOHWmeunFAb+J8tVV2dtQVM26HW/hOh9CvK34wPAkjedXki+hvfRFZtVzWlrXuDLyL9bkfPmnl9Mai6lb+3QWM8btNfuevDEhI4leLYfaBY4OY57T/ABGPIRzT4jaVR7pL3HmSd2iX/Ssrf9XH2EeSCPZH4lCdil5fT23VLWsL3zaDnIzGYjnu1802I249ts7+fWeI7oI+9yD+mZE63fgosmOrPTXYlAdjBxC8udt2s49R7gOJc5x9XXUau368AMecxPD0gzvVI/TMneX4CtRiXVM9QdiQvPvb/aoe9lFpkMlzo3vdECeQ/wB7kq9P2oeB1j1tHA3BI38hy71gViXvne50Am93G5PdJK7dJoXinuk7oXNnhKNRABhLg1oc47mtzOce4NBK0Kmw8Q0Zn4aplvJEuP8AK2XAcyOPhsYTEU6IDaTWh2hc0h7383kQB5wNyuUsZVeSWvJ0BNzDRocugXdLM+qqvklHFHo3z8HD1WDtNNt8TY6EGea9A9jtttfh203GH0hki92fA7yt3t5rn9t0w4knIXZcxIADnNkg5gNRwLuFt6y8DWfQdnboQRE9ppGseRS5ox1OKv4NBvDkvt3PUG45rrNcDr6J/eOa84qe0DrFluIMC++PqoP9oHEkhojWJcDzIINvJea/pkm+G6O6Ouxpcno5xrZjMJmIkTPBI1+a84ft8uY8CWuMFpnNfNcGdLXUG+0VTLBu7TMCRLZuCN/f3IP6U+zCvqGJNpnpQxHNMcSImZ7rk8gvPW7Tplod8Vy5sjW5Pp5rJrbVqZ5Y9zb2yuLfODf+qMfpabq/waX1CEa4Tvwz1HD7Ua6dRBgZrTrp5I/vbZjM2dYkTHGF5vQ9o3tYJLpEiZGU69a4uZ3aK/h9osqt6xLiInMIlxGsNMckJfTKlfYeGsxyVXz8ncNx7JjM2dYkTHd4Km72jw4/8dnnPyXG4gMbaWg74F77uY5cyqzqgyl3Rib7s0a67p5dypH6bhXLbIz1sk6SR6PRxzHgOa9pDgCII3odTaTGuyl1+N4Gup03FeZHaUZS1jQQQfEGYgRbTerTNpAtc0OgHNY6gHQeq3+mxTtN0Nj18HxJfwejuxjRq4DTWYvzU/eBEyL6X1XAu2oKhLA4kuEAbjEfRS/abaQDDBF7ybXNwAD3eKm9DwqfPgstZi3c9PJ3nTt4jzTLzmptV5JIc3yH0Toewl5B77D4ZktnfZTj1QgJMk96k2oJ/VeueC2aeHxIygPy5dIi5A+Xeq72y/qSBA/EYnWdShVWuMA6brR4rQwdRrGC8u3yLA7o89VNpRVrr4KJuVJgWYd4BBPeQbEXt6GyrE8T4q8/EG++N51shUsMHBzy8CJhsTJiYmRl3owflAkuaQRm0H3E6xJFiTzKI1pfo05o3SS7WSQhNZOVsTvBF4F723WlRZSqAzNp3Hx/VCknxwzXJ/YOyiSYggkCJtrHHxUmYd7iIaHHgJnv00Wl+0XAyWicguMsgOA3zax+aIdpHQQA4EmLXOszAkmL80rzT7RKrHF9X+CrS2a7LnrSxt4HxkjdB0vH3dVq+E1LTnEgaEm43j71Clj8W5zjPZbIaWx4E3VOhinsMjcZve/HmtBZW9z/AIEnKC/TFfuTp4V8yWCOf6hJ9F89gC5jQLRw203zlqE6jrgmBMmC3fceEKRxLXdbOZgQCxxnvMLrjBS5ZJuuDIGDfBzAcZ1Jjd6qXumgcQ3jcGATreC23CVpuewlslxv2YgC2/RFeWHsbiTJIEH8o42N90jeQn210CkVHUGsLmtvJmQ21h2ZJndfxS6Y/hFxG7/mWg9tuqLCwgeZ9AO5VX52yWZgdLATE3if6HmpbIvryWtroPWpNc1pqkRMQ/qXHEg7rmN8LMx2yrgtqtdpLRJiQJIi0anxW5RbnZlqWDmgGbEEWmSdbA+J4rOxTKbnHo3TlDySC22SIAuL/RbGlbXSh86dJ9b/AJKGA2aDJqaExY9xn0I8dybE0qQGUMi/am8G97dw8Fabi25C0knhIE+YJ+/SiGMIJLjIGkGCBAkn4UjjNzfLrsStKCpcgPdHODYDYNrESeFtU1bZ1RmXOBDrghzTbfKsw0vs6BIM3jxiY0WnUewsAe8HLbLMjefi0t6Stuku3BlBNPyc6/DNgEEZt7czRv3X7rKzgsEO29sg2aJ6s8SRqNBHMrTZSwznBjWNExDiJPWAOjtdY370V7GZcjHAAODbw0SSYJAG85t3DimySe3iw48a3c0Y+IL7GRA0bDQBGgyi0ckKjtAi0AE2sNLQSAujGEbSa7pHs67XMEEEMblmSRMEw1ojTMVi0cGzKXGHnNp4GJ0G7SSFOMlKNvodGbFsaSfI2Fol5zvLg0b9N02ujVH9WWts20AWA5H7k8VYwIBa8mIAGaIEHRuWLRE81RxWJZDb3Ag7pkSQTFtfkkTcpVRN0kArYRziIEk3BbJm0z5KviNm1GgGCfoYg/PyWnstpddpc8AR2oAjUOETN7DemxjRIADNLkazJ0jy3+SopuMtojhFrcylsmm4VAeAPfMX++9auMcSczG3LACJaGgO0vaTr3W3a5uGou6VrmEOE3DdRu/XXctLGsaID3ZeAFzBMnLu89JS5Hc0/g239PBlVGwSCSCDcZtElF5bPZ/zJJyFMcMBO5oAJgnSSIlSZRAd2mnlBPfouqZ7Ohp61S4Hwt+p/RWP2fSZAqVXgW0c1k23ZRMeKqkZt9zmH4ecuTOTHWzNMZpJ6oAs2I15qDmPNokzoBHfY+XgulqUKRGWg1znZ+0Q9/Vlws479FcYXgn9zSYL5c7w4jh1APOCtKCMmzl8PQqghzmwBeHgEEtgxBkEHSCiMwW4zmJGVpB1I0uzv8Fr4nFtHbrNFgMtJvWN7yXknThwVN+LoB7nMw9SrUkgue55ki1zIssopdEBp+SVHCvYbhkREPcwgZrdkQbiyuMwb3kt6FmWLva2o1hmZAktv3GLi+5AbjMS4gU6bKQ4wMwtF4E+fJSOHxYId0rXuNnB4GUDkBP2E1yqgxjfPJZo7OYJ6So1jfwNJqFugIIuYsbk79yFVxFAkimypUOk5AB3532R8BsoM60NDiOs4Tc77nQI7nsae2HH8tz4nRByUVyyji3y+CtQw0tBNMNM3Bg24yB4o7KJFw1rRHwgtLbfinXmPCE5xzWjRveSHO8pgeSqVdrsB0LjzH6yVCWs/wDmNm2xS5YWuC0dUBxnUgumXX7SLDYhxYO8Nv4kQsp+1XOsx2TwHz3KhWqPJ6xJ1uTPiljmyS6pITel0NrEYtjBDxaRBDGgEmwAII48k5a5uV5Y9odmDc7XNB0mDN4tyuO5D9ktmOxNVslwpsJc3txN5qZYAEjKGzPaPBeie02y/eWNaDlLJcy0yS2Ay+gJA9E0sjhJJvqPcpK0edOeYIkkEz8VoOglw3olPCVTLiHc3AkiOYzn5KWGwGaqxhPac1sxpnjKfULra2x3U6T+tZrHHXgCVSc67/gnGbb6fk5F1PNcPaDG5pJ03AknzVBmBdOXp35gQ4jIzQyLgWuJF1qbEoPfVa2JmddND9Ef2pwr6DmVmHVgY8AGMhPV01ykA9xKlNzT4f4OrDOEv6o9PDKlTBvOrx5OHyKhXolr3N6sBrCDfUtBcJm9/mjUXA2zSfl4AmPNFM8VwvVZIvk7HjjJXFUvuUX0ObfAkj0UTQkx1fEluiv9J3+aG4A6jyt6aFVjq76qhVDG+rAe7xGeW6bnOboN4KtUcOCwA5HF1wXNB6hAsM26QNEAAtux3lY+Sd2JkBrxIBBiYvuNu8+aMnOS/S7OmGPF4A43DOcwghgHFxfeQ0CwB0g+azWYF4y5csAEgZnAHMT+XQiPVbDKv4Khb+V4keB3eak57pl9NrxAOZsHjpO+3FTUskVTRpYYSd2/9zNZhTlyua1smSGmBvAl2UEqti9hh5PWYLkhrMgABIJtNtT3QPDXdiaEw8mm52gcCCY8IV/I5zG5SIbMObBJue13yg884/qaoX2sWqXP26nKYHCFjnszG7RHWaYvcDdmmSRwKfE7OkO7WYZS20h1+tLjEWPA6bl0FQVyHNhk3DXuYwxuF47tx03oHSavLMpsBkMASRZxOZp3ac9d1Fmbe4g9Olw7S+UYGHYabnTqSA0yzSTYHW5jRLF0HvBLWmzr332Ds2Y6zHmugFYjW/8AhYSfLL3IdQh8gZQN4LZFrxEGfNH1uboR4VVWcscG8yckXOkRYxa6S6X3ZvBh/wADfqmTe5RL2rAPxOFpklz3vdeSajjM66KsfaCmLUcO0njlEzzN02H2VTGjJ5vP/CPqtCnh40tyaMvrr6rv2ruzlV9kUHY3FvEDKxhk9Yi+a5sbG5Ki3Zr3/wDa1Xv5N6rfWPRbNKlwH3zVro8ozPIYOLiBPdPa8JRbSCoX1Mehspjbhl9ZJLjbgStOnSe4gAFxNo4n+EfRFwlek4y9z8n5GhxP8xEeIKJU9pcLRJa/pADoymA2W8atTPnePysLRySym1wkMoxSsA+oGGHmCNWwSR3jcqz9sR2GG2pdePAW158F2FP20woYG0mPYA0hhY1oawkEZmsmN83C5/EYylWtiMVWeAernpMqAc4JMHuUt0pdeDSb/wDVmFU2u87wf4ojy8vJBfjHHU/pdbnu+DkZarv/AKtKTbQRvlTq4TDhjnNNR0NJH90p5XGLDOBljnKTZfNk9snxZz3SfYUXTGshbmyKVOtn6d7mZYykYc1p1nRpLRpG7VXv2Xhp/wC8kNicxwTgBGubMwAd/fpaclx/wGWOnVnHuU24Vz3CmJ16zsjjDmuEUtdSIPi0b10O3tnAAtptYyo0dXqsphxMAOkC4gEgaT4q97O7Mph731GkS8VMjjOaoSHZ4zXAIGkgn+FVhFJOQjhtOo2Fhm4WhliXWJay5FgAxpJuG3vbebStBldgs2G6vIFjJ4jnfyWVUxrs8BrckXdPWzSbBkRGl58EN202M6z3QCbSAIi0CbnT1UJYXJttcsqsiSqzm9sjo8Q4tPYeHi/c9oHIAgeC6n2hxwGHqZXAyMog/iIHyJXnWNxz6lRz3OMl0+uSIHDqqywvdTYXNLm5R1vLWF0Sw8JvsQUqujc9l2iXvLScrWgAXubyBrIj1W3tZnTUy02BBkEEFwLSC3lqsf2eqtbTIEglxLhre2/uhXPfgWkVIYDIIzTY21gFTnjbd0VxTUaZxez6zmOfSqG7DZzpaCwmA4N3jMcv8oWmMU06GTyEDwGqBi20BWL6ZzkjIGgOJIN4g2sU/wCzj8VRrTN29HIb+XNPWj1UcmlU3uujojnlHhcoK2vm0SbJ5KtjuoWy/N1HuDw3LmfNmQZE2F+e7VHZhXkWragm1E6RPyXMtK3dNF5SSSpN2Svvjyn+qi943wRz/Q7kAt/9Q0j/ANs/JLS4rtnnSff7sqw0sk/6kKtRKK4snkaRYxwDt/cQotJabHKeR18QrNDGsAio9jiDIIpubaNCIvvRW7Zw9SWlwcG2gNfa2unV3+S6HjaXWykNVbqSr5ACu8agOHl8vogGkw9kupniCR4W+gQ6z2Bw6KoSD8Ja6RyBy5T3WPepve8dpvmCPmErxHRHNGXPgLNcXDw8De4mR/iab+Kd20TEVGEbybOFrm4005qqKwmxg96IMUd8O+fmFGWBeP7FVk8P+6LVKtQeIblbNzED0ME+CcYETLXzwBjf4Aqo7ondtsHib+rb+iicG7KehqEamxDgDzHDvCi8LXRtfcNp/wBUU/twy57g/l6pKpnxA/Aeca/JJJ6c/KFrD4YfD4Yujmnr16VMw4lzh8LRHqbD1SSXtPqeM+FwU8Rth+lMBk6Rd38x08IVPoy7rVHE8bkk95KSSbouCLbfUI99srAANEWlsVri11VoJeRkAALnzoJJhvifJMkuZSbk7KtJI6hnsQ4iS6lT/JlqPLe94qNBPcPPVT/2If8A+bS/+Or/APqkkuJ55/4jpWKJlYrZ7sLUDajGOAIIMuy1WxcZMxLRqCCbwdRCPjPb8PY6kaIaC0tlrzaRFurpySSXbFKVNk5Lb0MjY3tUzDFzmsLswAGZ5tEzYMv2vRaFb2vNV7HupNNNurc1pkDPGXrEXgEW1TpKiimyLdI2K22KFUBnVcBBjo7WtHWFvBZ+IwVBx/dl7HEjskxE3s6dySSyVdBI89SDGii4zWe6WmGuGnA5h3FCfWDmnPlNTI1jZGYAxDjJFiZN+SSSKbso4qkYH7NqgyXtjvd+U/h4g+i0sIxzQA4jLBBEuI3ECOSSSdydCKCT4LFbDl7nmnVc2nIhrGgRYby4fJQobLpmC8vebE5nW9IPqkklTdBlFWX8IyjTs0ASSD1bmdxI1WZjtpUWVDnp9aAO07dpYCNISSUm3uRTHFKLr4BVtqUqgDTTgNmLk668OCNhtpdFUDyAW5Rl7UgETpMXD7pJIbI8ou5vj9gdUtqvc6kxrby4OkATexb9FJuEP4GTxzv/AOVOkrwwQcVaODJqsqm6YfD4YE/vQGtg3a9zjPcW6aqpjtkim4kAAE9ppLZPMDfzhJJcOoXpy/SejgbyYm5AhSAi/cfr9fmrVDGuactWHiOF7gQeB+aSSVPfFKRTDJxfBZq7Na8B1MwCJE3HkbjwIVCrhyztgDgQZH19E6Snpc05zcJPg7tVhhjx+pFcjdGFHo94KSS62SpUiXvD/wAXndJJJbaie5n/2Q=="
              alt="Profile Picture"
              className="profile-picture"
            />
            <p className="bio">Hello World!</p>
            <p className="follower-count">Followers: 99</p>
            <button onClick={handleFollow}>
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          {/* <div className="post-container">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <img
                  src="../scr/Asset/image.jpg"
                  alt={post.title}
                  className="post-image"
                />
                <div className="post-details">
                  <p className="post-title">{post.title}</p>
                  <div className="post-interactions">
                    <span className="post-likes">{post.likes} Likes</span>
                    <span className="post-comments">
                      {post.comments} Comments
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <Posts posts = {posts}/>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
