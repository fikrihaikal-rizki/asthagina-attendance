import { useRouter } from "vue-router";

// export function useNavigation() {
//     setup() {
//         const router = useRouter();
//       }
// //   function navigateTo(url) {
// //     router.push(url);
// //   }
// //   return { navigateTo };
// };

export default {
  setup() {
    const router = useRouter();

    function navigateTo(url) {
      router.push(url);
    }
    
    return { navigateTo };
  },
};
