import { Link, useParams } from "react-router-dom";
import { servicesData } from "../../component/services/services";
import { useState } from "react";
import { showToast } from "../../component/ui/toast";
import { useGenericMutation } from "../../hooks/useMutation";
import { addJob, getNearbyJobs } from "../../api/user";
import { NearbyProviderDetails, ErrorResponse } from "../../types/types";
import Loader from "../../component/loader/loader";
import { useAuthStore } from "../../store/auth";

export const cities: { [key: string]: string[] } = {
  Alappuzha: [
    "Alappuzha Town",
    "Ambalappuzha",
    "Cherthala",
    "Haripad",
    "Kayamkulam",
    "Mavelikkara",
    "Chengannur",
    "Thiruvalla",
    "Karthikappally",
    "Muhamma",
    "Punnapra",
    "Thanneermukkom",
    "Chennam Pallipuram",
    "Thakazhi",
    "Ramankary",
  ],
  Ernakulam: [
    "Kochi",
    "Aluva",
    "Kothamangalam",
    "Perumbavoor",
    "Muvattupuzha",
    "Angamaly",
    "North Paravur",
    "Thrippunithura",
    "Kakkanad",
    "Kalamassery",
    "Mattancherry",
    "Cherai",
    "Thiruvankulam",
    "Koothattukulam",
    "Piravom",
  ],
  Idukki: [
    "Munnar",
    "Thodupuzha",
    "Idukki",
    "Adimali",
    "Nedumkandam",
    "Painavu",
    "Kattappana",
    "Vandiperiyar",
    "Rajakkad",
    "Udumbanchola",
    "Devikulam",
    "Kumily",
    "Peerumedu",
    "Elappara",
  ],
  Kannur: [
    "Kannur",
    "Thalassery",
    "Payyannur",
    "Kasaragod",
    "Kuthuparamba",
    "Iritty",
    "Mattannur",
    "Panoor",
    "Taliparamba",
    "Peringathur",
    "Kanhirode",
    "Keezhallur",
    "Kunhimangalam",
    "Munderi",
  ],
  Kasaragod: [
    "Kasaragod",
    "Kanhangad",
    "Nileshwar",
    "Cheruvathur",
    "Manjeswaram",
    "Bekal",
    "Udma",
    "Kumbla",
    "Padanna",
    "Narampady",
    "Pallikkara",
    "Koippadu",
    "Kumbala",
  ],
  Kollam: [
    "Kollam",
    "Punalur",
    "Karunagappally",
    "Kottarakkara",
    "Chavara",
    "Paravur",
    "Kunnathur",
    "Pathanapuram",
    "Sasthamkotta",
    "Oachira",
    "Chadayamangalam",
    "Kottiyam",
    "Kundara",
    "Eravipuram",
  ],
  Kottayam: [
    "Kottayam",
    "Changanassery",
    "Pala",
    "Kanjirappally",
    "Vaikom",
    "Ettumanoor",
    "Thiruvalla",
    "Chingavanam",
    "Kuravilangad",
    "Neendoor",
    "Puthuppally",
    "Kanjikkuzhi",
    "Manimala",
  ],
  Kozhikode: [
    "Kozhikode",
    "Koyilandy",
    "Vadakara",
    "Feroke",
    "Perambra",
    "Mavoor",
    "Kunnamangalam",
    "Ramanattukara",
    "Thamarassery",
    "Koduvally",
    "Beypore",
    "Kodanchery",
    "Thalakulathur",
  ],
  Malappuram: [
    "Malappuram",
    "Manjeri",
    "Ponnani",
    "Tirur",
    "Perinthalmanna",
    "Cherpulassery",
    "Kottakkal",
    "Nilambur",
    "Tanur",
    "Parappanangadi",
    "Wandoor",
    "Edappal",
    "Valanchery",
    "Vengara",
  ],
  Palakkad: [
    "Palakkad",
    "Ottapalam",
    "Chittur-Thathamangalam",
    "Alathur",
    "Mannarkkad",
    "Shoranur",
    "Cherpulassery",
    "Kongad",
    "Pattambi",
    "Thrithala",
    "Kuzhalmannam",
    "Kollengode",
    "Parli",
    "Nemmara",
  ],
  Pathanamthitta: [
    "Thiruvalla",
    "Adoor",
    "Pathanamthitta",
    "Pandalam",
    "Kozhencherry",
    "Ranni",
    "Konni",
    "Mallappally",
    "Aranmula",
    "Kadapra",
    "Niranam",
    "Thadiyoor",
    "Kumbanad",
    "Kunnamthanam",
  ],
  Thiruvananthapuram: [
    "Thiruvananthapuram",
    "Neyyattinkara",
    "Attingal",
    "Nedumangad",
    "Varkala",
    "Kattakada",
    "Nemom",
    "Kovalam",
    "Pothencode",
    "Parassala",
    "Vattiyoorkavu",
    "Vellanad",
    "Kudappanakunnu",
    "Kazhakoottam",
    "Vizhinjam",
  ],
  Thrissur: [
    "Thrissur",
    "Kodungallur",
    "Chalakudy",
    "Kunnamkulam",
    "Guruvayur",
    "Irinjalakuda",
    "Wadakkanchery",
    "Chavakkad",
    "Thriprayar",
    "Mala",
    "Mukundapuram",
    "Mulankunnathukavu",
  ],
  Wayanad: [
    "Kalpetta",
    "Mananthavady",
    "Sulthan Bathery",
    "Vythiri",
    "Panamaram",
    "Meppadi",
    "Pulpally",
    "Kaniyambetta",
    "Thariode",
    "Vellamunda",
    "Nenmeni",
    "Muttil",
    "Mullankolli",
    "Muppathadom",
    "Padichira",
  ],
};

const districts = [
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
];

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const ServiceDetailPage = () => {
  const { authenticated } = useAuthStore();
  const { id } = useParams();
  const userId = useAuthStore((state) => state.user?.user_id);
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const selectedService = servicesData.find((item) => item.id === id);
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [nearbyProviders, setNearbyProviders] =
    useState<NearbyProviderDetails[]>();

  const { mutate, isLoading } = useGenericMutation<
    NearbyProviderDetails[],
    ErrorResponse,
    {
      district: string;
      city: string;
      latitude: number;
      longitude: number;
      serviceType: string;
    }
  >(getNearbyJobs, {
    onSuccess: (data) => {
      setNearbyProviders(data.data);
    },
    onError: () => {
      setNearbyProviders([]);
    },
  });

  const { mutate: bookJob, isLoading: isAddingJob } = useGenericMutation<
    { message: string },
    ErrorResponse,
    {
      district: string;
      city: string;
      latitude: number;
      longitude: number;
      service_type: string;
      assigned_to_user: string;
      created_by_user: string;
    }
  >(addJob, {
    onSuccess: (data) => {
      showToast({
        variant: "success",
        message: data.data.message,
      });
      mutate({
        district,
        city,
        latitude: location.latitude || 0,
        longitude: location.longitude || 0,
        serviceType: id?.toLowerCase() || "",
      });
    },
    onError: (error: ErrorResponse) => {
      showToast({
        variant: "error",
        message: error?.response?.data?.error || error.message,
      });
    },
  });

  const handleGetLocation = () => {
    if (!authenticated) {
      window.location.href = "/sign-in";
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          if (!district || !city) {
            showToast({
              variant: "error",
              message: "Please select district and city",
            });
            return;
          } else {
            mutate(
              {
                district,
                city,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                serviceType: id?.toLowerCase() || "",
              },
              {
                onSuccess: (data) => {
                  setNearbyProviders(data.data);
                },
                onError: (error) => {
                  setNearbyProviders([]);
                  showToast({
                    variant: "error",
                    message: error.response?.data?.error || error.message,
                  });
                },
              }
            );
          }
        },
        (error) => {
          showToast({
            variant: "error",
            message: error.message,
          });
        }
      );
    } else {
      showToast({
        variant: "error",
        message: "Geolocation is not supported by this browser.",
      });
    }
  };

  const districtHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value);
    setCity("");
  };

  const cityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  const handleBookJob = (provider: NearbyProviderDetails) => {
    bookJob({
      district,
      city,
      latitude: location.latitude || 0,
      longitude: location.longitude || 0,
      service_type: id?.toLowerCase() || "",
      assigned_to_user: provider.user_id.toString(),
      created_by_user: userId?.toString() || "",
    });
  };

  return (
    <div>
      <div className="breadcrumbs">
        <div
          className="page-header d-flex align-items-center"
          style={{ backgroundImage: "url('/assets/img/page-header2.jpg')" }}
        >
          <div className="container position-relative">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 text-center">
                <h2 style={{ textTransform: "capitalize" }}>
                  {selectedService?.title?.toLocaleLowerCase()} Details
                </h2>
                <p>{selectedService?.description}</p>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <div className="container">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li style={{ textTransform: "capitalize" }}>
                {selectedService?.title?.toLocaleLowerCase()} Details
              </li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="service-details" className="service-details">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="input-half">
              <div className="select-box">
                <select id="district" required onChange={districtHandler}>
                  <option hidden>Select District</option>
                  {districts?.map((dis) => (
                    <option value={dis}>{dis}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-half">
              <div className="select-box">
                <select id="city" required onChange={cityHandler}>
                  <option hidden>Select City</option>
                  {(cities[district] || []).map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-half">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleGetLocation}
              >
                Search
              </button>
            </div>
          </div>

          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="services-list">
                <a href="#" className="active">
                  Experienced Professionals
                </a>
                <a href="#" className="active">
                  Reliable Service
                </a>
                <a href="#" className="active">
                  Quality Workmanship
                </a>
                <a href="#" className="active">
                  Customer Satisfaction
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="https://t3.ftcdn.net/jpg/00/27/61/68/360_F_27616800_mP42aLqY152iln3kHDTiAvlMrDoYU606.jpg"
                width="500"
              />
            </div>
          </div>
          <div className="row gy-4 p-4">
            {isLoading || isAddingJob ? (
              <Loader />
            ) : (
              <>
                {nearbyProviders?.map((provider: NearbyProviderDetails) => (
                  <div className="col-lg-4 p-4">
                    <div className="card flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
                      <div className="card-img flex justify-center mb-4">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                          width="200"
                          alt="avatar"
                          className="rounded-full shadow-md"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-center mb-2">
                        {provider.name}
                      </h4>
                      <div className="flex items-center gap-2 mb-4">
                        <img
                          src="/assets/img/star.png"
                          alt="star"
                          className="h-6 w-6"
                        />
                        <span className="text-yellow-500 text-xl font-medium">
                          {Number(provider.average_rating).toFixed(1)}
                        </span>
                      </div>
                      <div className="text-center text-sm text-gray-600 mb-4 space-y-2">
                        <p className="font-medium">
                          {provider.city}, {provider.district}
                        </p>
                        <p className="font-light">
                          {provider.years_of_experience} years of experience
                        </p>
                        <p className="font-normal">
                          role: {provider.role}</p>
                        <p className="font-light italic">
                          qualification: {provider.qualification}
                        </p>
                      </div>
                      <button
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        onClick={() => handleBookJob(provider)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
