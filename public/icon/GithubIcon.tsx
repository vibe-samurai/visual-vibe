import * as React from 'react';

const GithubIconSvg = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={36} height={36} viewBox={"0 0 36 36"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} {...props}>
      <g clipPath={"url(#clip0_3663_9518)"}>
        <path
          d={"M17.7135 0.720007H17.8474C21.0759 0.720007 24.097 1.60273 26.6847 3.13921L26.6055 3.09457C29.2997 4.66993 31.4813 6.85153 33.012 9.46225L33.0567 9.54577C34.5543 12.0931 35.4384 15.156 35.4384 18.4248C35.4384 26.2094 30.4229 32.8248 23.4475 35.2123L23.3223 35.2498C23.2315 35.2786 23.1279 35.2944 23.0213 35.2944C22.788 35.2944 22.572 35.2166 22.3978 35.087L22.4007 35.0885C22.2163 34.9229 22.1011 34.6838 22.1011 34.4174C22.1011 34.4102 22.1011 34.403 22.1011 34.3973V34.3987C22.1011 34.3526 22.105 33.7642 22.1127 32.6333C22.1203 31.5024 22.1242 30.4685 22.1242 29.5315C22.1343 29.4235 22.14 29.2997 22.14 29.173C22.14 28.0325 21.6749 27.0014 20.9247 26.257C21.8146 26.1691 22.6181 26.0222 23.3986 25.8178L23.2891 25.8422C24.1143 25.6118 24.8343 25.3051 25.5024 24.9178L25.4578 24.9422C26.1893 24.539 26.8085 24.0264 27.3183 23.4187L27.3269 23.4086C27.8626 22.7232 28.2816 21.9168 28.5365 21.0398L28.5495 20.9894C28.8504 20.0059 29.0232 18.8755 29.0232 17.7048C29.0232 17.64 29.0232 17.5738 29.0218 17.509V17.519C29.0218 17.4874 29.0232 17.4514 29.0232 17.4154C29.0232 15.6182 28.3291 13.9838 27.1959 12.7642L27.2002 12.7685C27.4421 12.1349 27.5818 11.4034 27.5818 10.6387C27.5818 9.70417 27.373 8.82001 27 8.02657L27.0159 8.06401C26.8503 8.03233 26.6616 8.01361 26.4672 8.01361C25.9863 8.01361 25.5327 8.12593 25.1295 8.32465L25.1467 8.31745C24.3288 8.61985 23.629 8.96257 22.9695 9.36289L23.0242 9.33121L22.1472 9.88417C20.8195 9.50401 19.2946 9.28513 17.7192 9.28513C16.1439 9.28513 14.6189 9.50401 13.1731 9.91297L13.2898 9.88417C13.044 9.71521 12.7171 9.50737 12.3091 9.26065C11.772 8.95249 11.137 8.65441 10.4775 8.40385L10.3824 8.37217C9.96051 8.15041 9.46083 8.02081 8.92947 8.02081C8.75091 8.02081 8.57523 8.03521 8.40531 8.06401L8.42403 8.06113C8.06691 8.81569 7.85811 9.70129 7.85811 10.6358C7.85811 11.4005 7.99779 12.1334 8.25411 12.8088L8.23971 12.767C7.10931 13.9824 6.41667 15.6168 6.41667 17.4139C6.41667 17.4499 6.41667 17.4874 6.41811 17.5234V17.5176C6.41667 17.5738 6.41667 17.6386 6.41667 17.7048C6.41667 18.8698 6.58947 19.9958 6.91203 21.0557L6.89043 20.9736C7.16259 21.8995 7.57587 22.7045 8.11443 23.4115L8.10147 23.3928C8.61123 24.0192 9.22755 24.5347 9.92595 24.9221L9.95763 24.9379C10.5797 25.3008 11.3011 25.6075 12.06 25.8221L12.1263 25.8379C12.7973 26.0179 13.6008 26.1648 14.4231 26.2469L14.4893 26.2526C13.8687 26.869 13.4554 27.6926 13.3603 28.6114L13.3589 28.6286C13.0608 28.7741 12.7138 28.8922 12.3523 28.9685L12.3221 28.9742C11.9535 29.0477 11.5315 29.0894 11.0981 29.0894C11.0664 29.0894 11.0347 29.0894 11.0031 29.0894H11.0074C10.44 29.0779 9.91875 28.8936 9.48819 28.5883L9.49683 28.5941C8.96259 28.2211 8.53059 27.7373 8.22819 27.1742L8.21811 27.1526C7.93299 26.6688 7.55715 26.2685 7.11219 25.9618L7.09923 25.9531C6.77523 25.7098 6.39363 25.5197 5.98179 25.4059L5.95875 25.4002L5.49795 25.331C5.46483 25.3282 5.42595 25.3267 5.38707 25.3267C5.18547 25.3267 4.99395 25.367 4.81971 25.4376L4.82979 25.4333C4.70691 25.5024 4.66851 25.5907 4.71459 25.6982C4.77075 25.8221 4.83987 25.9286 4.92339 26.0222L4.92195 26.0208C5.00979 26.1245 5.10915 26.2152 5.21715 26.2944L5.22147 26.2973L5.38275 26.4125C5.79027 26.6256 6.12579 26.9222 6.38067 27.2808L6.38643 27.2894C6.66147 27.6307 6.90339 28.0166 7.09779 28.4299L7.11219 28.4645L7.34259 28.9944C7.53699 29.5733 7.88979 30.0571 8.35059 30.407L8.35779 30.4128C8.78979 30.7498 9.31107 30.9917 9.87987 31.1011L9.90291 31.104C10.3781 31.1962 10.9311 31.2538 11.4955 31.2653H11.5056C11.5704 31.2682 11.6453 31.2682 11.7216 31.2682C12.0975 31.2682 12.4661 31.2379 12.8261 31.1789L12.7872 31.1846L13.3171 31.0925C13.3171 31.6771 13.321 32.3578 13.3287 33.1344C13.3363 33.911 13.3402 34.3301 13.3402 34.3915V34.4117C13.3402 34.6781 13.225 34.9171 13.0407 35.0827C12.8693 35.2109 12.6533 35.2886 12.4186 35.2886C12.3106 35.2886 12.2069 35.2728 12.1104 35.2426L12.1176 35.244C5.01987 32.8118 0.00866699 26.1965 0.00866699 18.4104C0.00866699 15.1445 0.889947 12.0845 2.42931 9.45505L2.38323 9.53857C3.95859 6.84433 6.14019 4.66273 8.75091 3.13201L8.83443 3.08737C11.3386 1.59841 14.3568 0.718567 17.5795 0.718567H17.7207H17.7135V0.720007ZM6.71187 26.159C6.75795 26.0515 6.70419 25.9594 6.55059 25.8826C6.39699 25.8365 6.29715 25.8518 6.25107 25.9286C6.20499 26.0362 6.25875 26.1283 6.41235 26.2051C6.55059 26.2973 6.65043 26.2819 6.71187 26.159ZM7.42755 26.9438C7.53507 26.867 7.51971 26.7442 7.38147 26.5752C7.22787 26.437 7.10499 26.4139 7.01283 26.5061C6.90531 26.5829 6.92067 26.7058 7.05891 26.8747C7.21155 27.0254 7.33443 27.048 7.42755 26.9424V26.9438ZM8.11875 27.9806C8.25699 27.8731 8.25699 27.7272 8.11875 27.5429C7.99587 27.3432 7.86531 27.2971 7.72707 27.4046C7.58883 27.4814 7.58883 27.6197 7.72707 27.8194C7.86531 28.019 7.99587 28.0728 8.11875 27.9806ZM9.08643 28.9498C9.20931 28.8269 9.17859 28.681 8.99427 28.512C8.80995 28.3277 8.65635 28.3046 8.53347 28.4429C8.39523 28.5658 8.42595 28.7117 8.62563 28.8806C8.80995 29.065 8.96355 29.0861 9.08643 28.944V28.9498ZM10.4011 29.5258C10.4472 29.3568 10.3474 29.2339 10.1016 29.1571C9.87123 29.0957 9.72531 29.1494 9.66387 29.3184C9.60243 29.4874 9.70227 29.6026 9.96339 29.664C10.1938 29.7571 10.3397 29.711 10.4011 29.5258ZM11.8541 29.641C11.8541 29.4413 11.7235 29.3568 11.4624 29.3875C11.2167 29.3875 11.0938 29.472 11.0938 29.641C11.0938 29.8406 11.2243 29.9251 11.4855 29.8944C11.7312 29.8954 11.8541 29.8099 11.8541 29.641ZM13.1919 29.4106C13.1611 29.2416 13.0229 29.1725 12.7771 29.2032C12.5314 29.2493 12.4239 29.3645 12.4546 29.5488C12.4853 29.7331 12.6235 29.7946 12.8693 29.7331C13.1151 29.6717 13.2216 29.5642 13.1919 29.4106Z"}
          fill={"white"}
        />
      </g>
      <defs>
        <clipPath>
          <rect width={36} height={36} fill={"white"} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GithubIconSvg;
