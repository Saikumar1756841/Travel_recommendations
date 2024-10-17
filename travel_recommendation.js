// Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.querySelector('#homeLink');
    const aboutLink = document.querySelector('#aboutLink');
    const contactLink = document.querySelector('#contactLink');
    const homeSection = document.querySelector('.home-section');
    const aboutSection = document.querySelector('.about-section');
    const contactSection = document.querySelector('.contact-section');
    const recommendationsDiv = document.getElementById('recommendations');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');

    // Show home section by default
    homeSection.style.display = 'block';
    aboutSection.style.display = 'none';
    contactSection.style.display = 'none';

    // Navigation functions
    function showHome() {
        homeSection.style.display = 'block';
        aboutSection.style.display = 'none';
        contactSection.style.display = 'none';
        recommendationsDiv.innerHTML = ''; // Clear recommendations
        searchInput.value = ''; // Clear search input
    }

    function showAbout() {
        homeSection.style.display = 'none';
        aboutSection.style.display = 'block';
        contactSection.style.display = 'none';
        recommendationsDiv.innerHTML = ''; // Clear recommendations
        searchInput.value = ''; // Clear search input
    }

    function showContact() {
        homeSection.style.display = 'none';
        aboutSection.style.display = 'none';
        contactSection.style.display = 'block';
        recommendationsDiv.innerHTML = ''; // Clear recommendations
        searchInput.value = ''; // Clear search input
    }

    // Event listeners for navigation links
    homeLink.addEventListener('click', showHome);
    aboutLink.addEventListener('click', showAbout);
    contactLink.addEventListener('click', showContact);

    // Fetch travel recommendations from JSON file
    

    window.travelData = {
        "countries": [
          {
            "id": 1,
            "name": "Australia",
            "cities": [
              {
                "name": "Sydney, Australia",
                "imageUrl": "./images/sydney.jpg",
                "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
              },
              {
                "name": "Melbourne, Australia",
                "imageUrl": "./images/melbourne.jpeg",
                "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
              }
            ]
          },
          {
            "id": 2,
            "name": "Japan",
            "cities": [
              {
                "name": "Tokyo, Japan",
                "imageUrl": "./images/tokyo.jpeg",
                "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
              },
              {
                "name": "Kyoto, Japan",
                "imageUrl": "./images/kyoto.jpeg",
                "description": "Known for its historic temples, gardens, and traditional tea houses."
              }
            ]
          },
          {
            "id": 3,
            "name": "Brazil",
            "cities": [
              {
                "name": "Rio de Janeiro, Brazil",
                "imageUrl": "./images/rio.jpeg",
                "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks."
              },
              {
                "name": "São Paulo, Brazil",
                "imageUrl": "./images/sydney.jpg",
                "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
              }
            ]
          }
        ],
        "temples": [
          {
            "id": 1,
            "name": "Angkor Wat, Cambodia",
            "imageUrl": "./images/melbourne.jpeg",
            "description": "A UNESCO World Heritage site and the largest religious monument in the world."
          },
          {
            "id": 2,
            "name": "Taj Mahal, India",
            "imageUrl": "./images/tajmahal.jpeg",
            "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
          }
        ],
        "beaches": [
          {
            "id": 1,
            "name": "Bora Bora, French Polynesia",
            "imageUrl": "./images/melbourne.jpeg",
            "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
          },
          {
            "id": 2,
            "name": "Copacabana Beach, Brazil",
            "imageUrl": "./images/melbourne.jpeg",
            "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
          }
        ]
      }
      

    function displayRecommendations(recommendations) {
        recommendationsDiv.innerHTML = ''; // Clear previous recommendations

        if (recommendations.length === 0) {
            recommendationsDiv.innerHTML = '<p>No recommendations found.</p>'; // Message when no results
            return;
        }
        const recdiv = document.getElementById('recommendations');
        recommendations.forEach(rec => {
            const recommendationDiv = document.createElement('div');
            recommendationDiv.className = 'recommendation';

            const img = document.createElement('img');
            img.src = rec.imageUrl;
            img.alt = rec.title;

            const title = document.createElement('h3');
            title.textContent = rec.title;

            const description = document.createElement('p');
            description.textContent = rec.description;

            recommendationDiv.appendChild(img);
            recommendationDiv.appendChild(title);
            recommendationDiv.appendChild(description);
            recommendationsDiv.appendChild(recommendationDiv);
            recdiv.appendChild(recommendationDiv);
        });
    }

    function searchRecommendations(keyword) {
        // Ensure travelData has been loaded
        if (!window.travelData) {
            alert("Recommendations data not yet loaded.");
            return;
        }

        const searchTerm = keyword.toLowerCase();
        const matchingRecommendations = [];

        // Search through countries and cities
        window.travelData.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(searchTerm)) {
                    matchingRecommendations.push({
                        title: city.name,
                        description: city.description,
                        imageUrl: city.imageUrl
                    });
                }
            });
        });

        // Search through temples
        window.travelData.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(searchTerm)) {
                matchingRecommendations.push({
                    title: temple.name,
                    description: temple.description,
                    imageUrl: temple.imageUrl
                });
            }
        });

        // Search through beaches
        window.travelData.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(searchTerm)) {
                matchingRecommendations.push({
                    title: beach.name,
                    description: beach.description,
                    imageUrl: beach.imageUrl
                });
            }
        });

        // Handle the search result
        if (matchingRecommendations.length === 0) {
            alert("No recommendations found for your search.");
        } else if (matchingRecommendations.length < 2) {
            alert("Sorry, not enough results found for your search.");
        } else {
            displayRecommendations(matchingRecommendations);
        }
    }

    // Search button event listener
    searchButton.addEventListener('click', function() {
        const searchInputValue = searchInput.value.trim();
        if (searchInputValue) {
            searchRecommendations(searchInputValue);
        } else {
            alert("Please enter a keyword to search.");
        }
    });

    // Clear button event listener
    clearButton.addEventListener('click', function() {
        searchInput.value = ''; // Clear search input
        recommendationsDiv.innerHTML = ''; // Clear recommendations
    });
});
