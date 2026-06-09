import * as fs from 'fs';

const filePath = './constants.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Fix Chunk 1: The bracket at 105
content = content.replace(/image: '\/photo\/1\/スクリーンショット1-3 2026-03-18 145141\.png',\n\s+}\n\s+],/, 
`image: '/photo/1/スクリーンショット1-3 2026-03-18 145141.png',
          }
        ],`);

const section2Start = content.indexOf("id: 'material-input',");
const adminSectionStart = content.indexOf("id: SectionType.ADMIN,");

if (section2Start !== -1 && adminSectionStart !== -1) {
    const pageOpenBrace = content.lastIndexOf("{", section2Start);
    const prevLine = content.lastIndexOf("\n", pageOpenBrace) + 1;
    
    const nextSectionOpenBrace = content.lastIndexOf("{", adminSectionStart);
    const nextLine = content.lastIndexOf("\n", nextSectionOpenBrace) + 1;

    const replacement = `      {
        id: 'material-input',
        pdfPage: 18,
        title: {
          ja: '[材料払出投入記録]{ざいりょうはらいだしとうにゅうきろく}を [登録]{とうろく}する',
          en: 'Register Material Discharge/Input Record',
          vi: 'Đăng ký ghi chép xả/nhập nguyên liệu',
          pt: 'Registrar Registro de Descarga/Entrada de Material',
          tl: 'I-register ang Material Discharge/Input Record',
          id: 'Daftarkan Catatan Pengeluaran/Pemasukan Bahan',
          ne: 'सामग्री डिस्चार्ज/इनपुट रेकर्ड दर्ता गर्नुहोस्'
        },
        content: {
          ja: '[使用]{しよう}する[材料]{ざいりょう}について [登録]{とうろく}します。',
          en: 'Register the materials to be used.',
          vi: 'Đăng ký các nguyên liệu sẽ được sử dụng.',
          pt: 'Registre os materiais a serem usados.',
          tl: 'I-register ang mga materyales na gagamitin.',
          id: 'Daftarkan bahan yang akan digunakan.',
          ne: 'प्रयोग गरिने सामग्रीहरू दर्ता गर्नुहोस्।'
        },
        steps: [
          {
            number: 1,
            title: {
              ja: '「[検索]{けんさく}」を おす',
              en: 'Press "Search"',
              vi: 'Nhấn "Tìm kiếm"',
              pt: 'Pressione "Pesquisar"',
              tl: 'Pindutin ang "Search"',
              id: 'Tekan "Cari"',
              ne: '"खोज" थिच्नुहोस्'
            },
            description: {
              ja: '「[検索]{けんさく}」をタップして INJ [事前準備一覧]{じぜんじゅんびいちらん}を [表示]{ひょうじ}させます。',
              en: 'Tap "Search" to display the INJ Pre-preparation list.',
              vi: 'Chạm vào "Tìm kiếm" để hiển thị danh sách chuẩn bị INJ.',
              pt: 'Toque em "Pesquisar" para exibir a lista de pré-preparação INJ.',
              tl: 'I-tap ang "Search" para ipakita ang listahan ng INJ Pre-preparation.',
              id: 'Ketuk "Cari" untuk menampilkan daftar pra-persiapan INJ.',
              ne: 'INJ पूर्व-तयारी सूची प्रदर्शन गर्न "खोज" ट्याप गर्नुहोस्।'
            },
            image: '/photo/2/スクリーンショット2.121 2026-04-13 095446.png',
          },
          {
            number: 2,
            title: {
              ja: 'データ（[行]{ぎょう}）を [選]{えら}ぶ',
              en: 'Select Data (Row)',
              vi: 'Chọn dữ liệu (Hàng)',
              pt: 'Selecionar dados (Linha)',
              tl: 'Pumili ng Data (Row)',
              id: 'Pilih Data (Baris)',
              ne: 'डाटा (पङ्क्ति) छान्नुहोस्'
            },
            description: {
              ja: '[登録]{とうろく}したい [指示]{しじ}データを [選択]{せんたく}します।',
              en: 'Select the instruction data to register.',
              vi: 'Chọn dữ liệu hướng dẫn để đăng ký.',
              pt: 'Selecione os dados de instrução para registrar.',
              tl: 'Pumili ng data ng tagubilin na ire-register.',
              id: 'Pilih data instruksi untuk didaftarkan.',
              ne: 'दर्ता गर्न निर्देशन डाटा चयन गर्नुहोस्।'
            },
            image: '/photo/2/スクリーンショット2.122.png',
          },
          {
            number: 3,
            title: {
              ja: '[内容]{ないよう}を[確認]{かくにん}し、[投入]{とうにゅう}・[払出]{はらいだし}を[登録]{とうろく}する',
              en: 'Check Details and Register Input/Discharge',
              vi: 'Kiểm tra chi tiết và đăng ký Nhập/Xả',
              pt: 'Verificar detalhes e registrar entrada/descarga',
              tl: 'Suriin ang mga Detalye at Irehistro ang Input/Discharge',
              id: 'Periksa Detail dan Daftarkan Pemasukan/Pengeluaran',
              ne: 'विवरणहरू जाँच गर्नुहोस् र इनपुट/डिस्चार्ज दर्ता गर्नुहोस्'
            },
            description: {
              ja: '[内容]{ないよう}を[確認]{かくにん}して、[投入]{とうにゅう}または[払出]{はらいだし}をタップして[登録]{とうろく}します。',
              en: 'Verify the details and tap "Input" or "Discharge" to register.',
              vi: 'Xác minh chi tiết và chạm vào "Nhập" hoặc "Xả" để đăng ký.',
              pt: 'Verifique os detalhes e toque em "Entrada" ou "Descarga" para registrar.',
              tl: 'I-verify ang mga detalye at i-tap ang "Input" o "Discharge" para mag-register.',
              id: 'Verifikasi detail dan ketuk "Pemasukan" atau "Pengeluaran" untuk mendaftar.',
              ne: 'विवरणहरू प्रमाणित गर्नुहोस् र दर्ता गर्न "इनपुट" वा "डिस्चार्ज" ट्याप गर्नुहोस्।'
            },
            image: '/photo/2/スクリーンショット2.124 2026-04-13 132521.png',
            video: '/photo/2/動画2.123.mp4',
          },
          {
            number: 4,
            title: {
              ja: '「[払出]{はらいだし}」または「[投入]{とうにゅう}」を おす',
              en: 'Press "Discharge" or "Input"',
              vi: 'Nhấn "Xả" hoặc "Nhập"',
              pt: 'Pressione "Descarga" ou "Entrada"',
              tl: 'Pindutin ang "Discharge" o "Input"',
              id: 'Tekan "Pengeluaran" atau "Pemasukan"',
              ne: '"डिस्चार्ज" वा "इनपुट" थिच्नुहोस्'
            },
            description: {
              ja: '「[払出]{はらいだし}」または「[投入]{とうにゅう}」ボタンを タップして [登録]{とうろく}します。',
              en: 'Tap the "Discharge" or "Input" button to register.',
              vi: 'Chạm vào nút "Xả" hoặc "Nhập" để đăng ký.',
              pt: 'Toque no botão "Descarga" ou "Entrada" para registrar.',
              tl: 'I-tap ang button na "Discharge" o "Input" para mag-register.',
              id: 'Ketuk tombol "Pengeluaran" atau "Pemasukan" untuk mendaftar.',
              ne: '"डिस्चार्ज" वा "इनपुट" बटन ट्याप गरेर दर्ता गर्नुहोस्।'
            },
            image: '/photo/2/スクリーンショット2.124 2026-04-13 132521.png',
          }
        ]
      }
    ]
  },
  {
    id: SectionType.MOLDING,
    title: {
      ja: '3. つくる（[成形]{せいけい}）',
      en: '3. Production (Molding)',
      vi: '3. Sản xuất (Đúc)',
      pt: '3. Produção (Moldagem)',
      tl: '3. Produksyon (Molding)',
      id: '3. Produksi (Pencetakan)',
      ne: '3. उत्पादन (मोल्डिङ)'
    },
    icon: '🛠️',
    pages: [
      {
        id: 'molding-start',
        pdfPage: 29,
        title: {
          ja: '[作業]{さぎょう}を はじめる',
          en: 'Start Work',
          vi: 'Bắt đầu công việc',
          pt: 'Iniciar o trabalho',
          tl: 'Simulan ang Trabaho',
          id: 'Mulai Bekerja',
          ne: 'काम सुरु गर्नुहोस्'
        },
        content: {
          ja: '[今日]{きょう}つくるものを [選]{えら}んで、スタートします。',
          en: 'Select what to make today and start.',
          vi: 'Chọn những gì cần làm hôm nay và bắt đầu.',
          pt: 'Selecione o que fazer hoje e comece.',
          tl: 'Piliin ang gagawin ngayong araw at magsimula.',
          id: 'Pilih apa yang akan dibuat hari ini और mulai.',
          ne: 'आज के बनाउने छनौट गर्नुहोस् र सुरु गर्नुहोस्।'
        },
        steps: [
          {
            number: 1,
            title: {
              ja: 'つくるものを [選]{えら}ぶ',
              en: 'Select Product',
              vi: 'Chọn sản phẩm',
              pt: 'Selecionar produto',
              tl: 'Pumili ng Produkto',
              id: 'Pilih Produk',
              ne: 'उत्पादन छान्नुहोस्'
            },
            description: {
              ja: '「[検索]{けんさく}」をおして リストから [今日]{きょう}つくる[製品]{せいひん}を [選]{えら}んでタップします।',
              en: 'Press "Search" and tap the product you will make today from the list.',
              vi: 'Nhấn "Tìm kiếm" và chạm vào sản phẩm bạn sẽ làm hôm nay từ danh sách.',
              pt: 'Pressione "Pesquisar" e toque no produto que você fará hoje na lista.',
              tl: 'Pindutin ang "Search" at i-tap ang produktong gagawin mo ngayong araw mula sa lista.',
              id: 'Ketuk tombol "Cari" dan ketuk produk yang akan Anda buat hari ini dari daftar.',
              ne: 'सूचीबाट तपाईंले आज बनाउनुहुने उत्पादन "खोज" थिच्नुहोस् र ट्याप गर्नुहोस्।'
            },
            image: '/photo/3/スクリーンショット3-1 2026-03-29 161906.png',
          },
          {
            number: 2,
            title: {
              ja: '「[実績入力]{じっせきにゅうりょく}」を おす',
              en: 'Press "Result Input"',
              vi: 'Nhấn "Nhập kết quả"',
              pt: 'Pressione "Entrada de Resultado"',
              tl: 'Pindutin ang "Result Input"',
              id: 'Tekan "Input Hasil"',
              ne: '"नतिजा इनपुट" थिच्नुहोस्'
            },
            description: {
              ja: '[画面]{がめん}の[下]{した}にある [青]{あお}い「[実績入力]{じっせきにゅうりょく}」を タップします。',
              en: 'Tap the blue "Result Input" button at the bottom of the screen.',
              vi: 'Chạm vào nút "Nhập kết quả" màu xanh ở cuối màn hình.',
              pt: 'Toque no botão azul "Entrada de Resultado" na parte inferior da tela.',
              tl: 'I-tap ang asul na button na "Result Input" sa ibaba ng screen.',
              id: 'Ketuk tombol biru "Input Hasil" di bagian bawah layar.',
              ne: 'स्क्रिनको तल रहेको नीलो "नतिजा इनपुट" ボタン ट्याप गर्नुहोस्।'
            },
            image: '/photo/3/スクリーンショット3-2 2026-03-29 162605.png',
          },
          {
            number: 3,
            title: {
              ja: 'シフトを [選]{えら}ぶ',
              en: 'Select Shift',
              vi: 'Chọn ca làm việc',
              pt: 'Selecionar turno',
              tl: 'Pumili ng Shift',
              id: 'Pilih Shift',
              ne: 'シフト छान्नुहोस्'
            },
            description: {
              ja: '[今]{いま}の[時間帯]{じかんたい}（A[勤]{きん}・B[勤]{きん}など）を [選]{えら}んで「[決定]{けってい}」を おすと、[記録]{きろく}が はじまるように なります।',
              en: 'Select the current time slot (Shift A, Shift B, etc.) and press "Confirm" to start recording.',
              vi: 'Chọn khung giờ hiện tại (Ca A, Ca B, v.v.) และ nhấn "Xác nhận" เพื่อเริ่มบันทึก।',
              pt: 'Selecione o intervalo de tempo atual (Turno A, Turno B, etc.) e pressione "Confirmar" para iniciar o registro.',
              tl: 'Pumili ng kasalukuyang time slot (Shift A, Shift B, atbp.) at pindutin ang "Confirm" para simulan ang pag-record.',
              id: 'Pilih slot waktu saat ini (Shift A, Shift B, dll.) और tekan "Konfirmasi" untuk mulai mencatat.',
              ne: 'हालको समय स्लट (शिफ्ट A, शिफ्ट B, आदि) छान्नुहोस् र रेकर्डिङ सुरु गर्न "पुष्टि गर्नुहोस्" थिच्नुहोस्।'
            },
            video: 'https://drive.google.com/file/d/1UpjaQ39XxOv1Uj-Q9dxYrEPkONBgk70m/preview',
          }
        ]
      },
      {
        id: 'box-number-registration',
        pdfPage: 34,
        title: {
          ja: '[箱]{はこ}[番号]{ばんごう}を [登録]{とうろく}する',
          en: 'Register Box Number',
          vi: 'Đăng ký số hộp',
          pt: 'Registrar número da caixa',
          tl: 'Irehistro ang Numero ng Kahon',
          id: 'Daftarkan Nomor Kotak',
          ne: 'बक्स नम्बर दर्ता गर्नुहोस्'
        },
        content: {
          ja: '[新]{あたら}しい[箱]{はこ}を つかうときに、[箱]{はこ}の[番号]{ばんごう}を [読]{よ}み[込]{こ}みます।',
          en: 'Scan the box number when using a new box.',
          vi: 'Quét số hộp khi sử dụng hộp mới.',
          pt: 'Digitalize o número da caixa ao usar uma nova caixa.',
          tl: 'I-scan ang numero ng kahon kapag gumagamit ng bagong kahon.',
          id: 'Pindai nomor kotak saat menggunakan kotak baru.',
          ne: 'नयाँ बक्स प्रयोग गर्दा बक्स नम्बर स्क्यान गर्नुहोस्।'
        },
        steps: [
          {
            number: 1,
            title: {
              ja: '[正規容器]{せいきようき}を [追加]{ついか}する[場合]{ばあい}',
              en: 'When adding a regular container',
              vi: 'Khi thêm thùng chứa thông thường',
              pt: 'Ao adicionar um recipiente regular',
              tl: 'Kapag nagdaragdag ng regular na lalagyan',
              id: 'Saat menambahkan wadah reguler',
              ne: 'नियमित कन्टेनर थप्दा'
            },
            description: {
              ja: '[正規容器]{せいきようき}の [完了時]{かんりょうじ}に [画面]{がめん}[中央]{ちゅうおう}の ボタンを [押]{お}します।',
              en: 'Press the button in the center of the screen when the regular container is complete.',
              vi: 'Nhấn nút ở giữa màn hình khi thùng chứa thông thường hoàn tất.',
              pt: 'Pressione o botão no centro da tela quando o recipiente regular estiver concluído.',
              tl: 'Pindutin ang button sa gitna ng screen kapag tapos na ang regular na lalagyan.',
              id: 'Tekan tombol di tengah layar saat wadah reguler selesai.',
              ne: 'नियमित कन्टेनर पूरा भएपछि स्क्रिनको बीचमा रहेको बटन थिच्नुहोस्।'
            },
            image: '/photo/3/スクリーンショット3.21 2026-03-29 173311.png',
          },
          {
            number: 2,
            title: {
              ja: '[正規容器]{せいきようき}と [仮容器]{かりようき}を [切]{き}り[替]{か}える[場合]{ばあい}',
              en: 'When switching between regular and temporary containers',
              vi: 'Khi chuyển đổi giữa thùng chứa thông thường and tạm thời',
              pt: 'Ao alternar entre recipientes regulares e temporários',
              tl: 'Kapag lumilipat sa pagitan ng regular at pansamantalang mga lalagyan',
              id: 'Saat beralih antara wadah reguler dan sementara',
              ne: 'नियमित र अस्थायी कन्टेनरहरू बीच स्विच गर्दा'
            },
            description: {
              ja: '[正規容器]{せいきようき}か [仮容器]{かりようき}か、[使]{つか}う [箱]{はこ}に [合]{あ}わせて [画面]{がめん}の [左下]{ひだりした}にある ボタンを [切]{き}り[替]{か}えます।',
              en: 'Switch the button at the bottom left of the screen according to the type of box you are using (Regular or Temporary).',
              vi: 'Chuyển đổi nút ở phía dưới bên trái màn hình tùy theo loại thùng bạn đang sử dụng (Thông thường hoặc Tạm thời).',
              pt: 'Alterne o botão no canto inferior esquerdo da tela de acordo com o tipo de caixa que está usando (Regular ou Temporária).',
              tl: 'I-switch ang button sa ibabang kaliwa ng screen ayon sa uri ng kahon na iyong ginagamit (Regular o Pansamantalang).',
              id: 'Ganti tombol di kiri bawah layar sesuai dengan jenis kotak yang Anda gunakan (Reguler atau Sementara).',
              ne: 'तपाईंले प्रयोग गरिरहनुभएको बक्सको प्रकार (नियमित वा अस्थायी) अनुसार स्क्रिनको तल बायाँपट्टिको बटन स्विच गर्नुहोस्।'
            },
            image: '/photo/3/スクリーンショット3.22 2026-03-29 173445.png',
          }
        ]
      },
      {
        id: 'work-pause',
        pdfPage: 37,
        title: {
          ja: 'ちょう[ちょっと]{ちょっと} [休憩]{きゅうけい}（[作業]{さぎょう}[一時]{いちじ}[停止]{ていし}）',
          en: 'Short Break (Work Pause)',
          vi: 'Nghỉ ngắn (Tạm dừng công việc)',
          pt: 'Intervalo curto (Pausa no trabalho)',
          tl: 'Maikling Break (Work Pause)',
          id: 'Istirahat Singkat (Berhenti Sejenak)',
          ne: 'छोटो ब्रेक (काम रोक्ने)'
        },
        content: {
          ja: 'トイレや ちょこっと [休憩]{きゅうけい}するときに タップします।',
          en: 'Tap when taking a restroom or short break.',
          vi: 'Chạm khi đi vệ sinh hoặc nghỉ giải lao ngắn.',
          pt: 'Toque quando for ao banheiro ou fizer um intervalo curto.',
          tl: 'I-tap kapag gagamit ng banyo o magpapahinga nang sandali.',
          id: 'Ketuk saat pergi ke toilet atau istirahat sejenak.',
          ne: 'शौचालय जान वा छोटो ब्रेक लिँदा ट्याप गर्नुहोस्।'
        },
        steps: [
          {
            number: 1,
            title: {
              ja: '「[停止]{ていし}」を おす',
              en: 'Press "Stop"',
              vi: 'Nhấn "Dừng"',
              pt: 'Pressione "Parar"',
              tl: 'Pindutin ang "Stop"',
              id: 'Tekan "Berhenti"',
              ne: '"रोक्नुहोस्" थिच्नुहोस्'
            },
            description: {
              ja: '[実績入力画面]{じっせきにゅうりょくがめん}の [左]{ひだり}にある「[停止]{ていし}」を タップします।',
              en: 'Tap "Stop" on the left of the result input screen.',
              vi: 'Chạm vào "Dừng" ở bên trái của màn hình nhập kết quả.',
              pt: 'Toque em "Parar" à esquerda da tela de entrada de resultados.',
              tl: 'I-tap ang "Stop" sa kaliwa ng screen ng result input.',
              id: 'Ketuk "Berhenti" di sebelah kiri layar input hasil.',
              ne: 'नतिजा इनपुट स्क्रिनको बायाँमा रहेको "रोक्नुहोस्" ट्याप गर्नुहोस्।'
            },
            image: '/photo/3/スクリーンショット3.31 2026-03-29 174624.png',
          },
          {
            number: 2,
            title: {
              ja: '[停止理由]{ていしりゆう}を [選]{えら}ぶ',
              en: 'Select Stop Reason',
              vi: 'Chọn lý do dừng',
              pt: 'Selecionar motivo da parada',
              tl: 'Pumili ng Dahilan ng Paghinto',
              id: 'Pilih Alasan Berhenti',
              ne: 'रोकिनुको कारण छान्नुहोस्'
            },
            description: {
              ja: '「トイレ / きゅうけい」ボタンを タップして「[決定]{けってい}」します।',
              en: 'Tap "Toilet / Break" and then "Confirm".',
              vi: 'Chạm vào "Vệ sinh / Giải lao" và sau đó nhấn "Xác nhận".',
              pt: 'Toque em "Banheiro / Intervalo" e depois em "Confirmar".',
              tl: 'I-tap ang "Toilet / Break" at pagkatapos ay ang "Confirm".',
              id: 'Ketuk "Toilet / Istirahat" lalu "Konfirmasi".',
              ne: '"शौचालय / ब्रेक" ट्याप गर्नुहोस् र त्यसपछि "पुष्टि गर्नुहोस्"।'
            },
            image: '/photo/3/スクリーンショット3.32 2026-03-29 174704.png',
          }
        ]
      },
      {
        id: 'shift-change-molding',
        pdfPage: 39,
        title: {
          ja: 'シフトを [交代]{こうたい}する',
          en: 'Shift Change',
          vi: 'Thay đổi ca làm việc',
          pt: 'Mudança de turno',
          tl: 'Pagbabago ng Shift',
          id: 'Perubahan Shift',
          ne: 'シフト परिवर्तन'
        },
        content: {
          ja: 'シフトが [変]{か}わるときに タップして [実績]{じっせき}を [登録]{とうろく}します।',
          en: 'Tap to register results when shifts change.',
          vi: 'Chạm để đăng ký kết quả khi thay đổi ca.',
          pt: 'Toque para registrar resultados quando os turnos mudarem.',
          tl: 'I-tap para mag-register ng mga resulta kapag nagbabago ang mga shift.',
          id: 'Ketuk untuk mendaftarkan hasil saat shift berubah.',
          ne: 'शिफ्टहरू परिवर्तन हुँदा नतिजाहरू दर्ता गर्न ट्याप गर्नुहोस्।'
        },
        steps: [
          {
            number: 1,
            title: {
              ja: '「シフト[変更]{へんこう}」を おす',
              en: 'Press "Shift Change"',
              vi: 'Nhấn "Thay đổi ca"',
              pt: 'Pressione "Mudança de Turno"',
              tl: 'Pindutin ang "Shift Change"',
              id: 'Tekan "Perubahan Shift"',
              ne: '"शिफ्ट परिवर्तन" थिच्नुहोस्'
            },
            description: {
              ja: '[実績入力画面]{じっせきにゅうりょくがめん}にある「シフト[変更]{へんこう}」ボタンを タップします।',
              en: 'Tap the "Shift Change" button on the result input screen.',
              vi: 'Chạm vào nút "Thay đổi ca" trên màn hình nhập kết quả.',
              pt: 'Toque no botão "Mudança de Turno" na tela de entrada de resultados.',
              tl: 'I-tap ang button na "Shift Change" sa screen ng result input.',
              id: 'Ketuk tombol "Perubahan Shift" pada layar input hasil.',
              ne: 'नतिजा इनपुट स्क्रिनमा रहेको "शिफ्ट परिवर्तन" बटन ट्याप गर्नुहोस्।'
            },
            image: '/photo/3/スクリーンショット3.41 2026-03-29 174823.png',
          },
          {
            number: 2,
            title: {
              ja: '[数]{かず}を [登録]{とうろく}する',
              en: 'Register Count',
              vi: 'Đăng ký số lượng',
              pt: 'Registrar contagem',
              tl: 'Irehistro ang Bilang',
              id: 'Daftarkan Jumlah',
              ne: 'गणना दर्ता गर्नुहोस्'
            },
            description: {
              ja: '[生産実績]{せいさんじっせき}（つくった[数]{かず}）を [入力]{にゅうりょく}して、「[登録]{とうろく}」を タップします।',
              en: 'Enter the production result (count made) and tap "Register".',
              vi: 'Nhập kết quả sản xuất (số lượng đã làm) và chạm vào "Đăng ký".',
              pt: 'Insira o resultado da produção (contagem feita) e toque em "Registrar".',
              tl: 'Ilagay ang production result (bilang ng ginawa) at i-tap ang "Register".',
              id: 'Masukkan hasil produksi (jumlah yang dibuat) dan ketuk "Daftar".',
              ne: 'उत्पादन नतिजा (बनाइएको गणना) प्रविष्ट गर्नुहोस् र "दर्ता गर्नुहोस्" ट्याप गर्नुहोस्।'
            },
            image: '/photo/3/スクリーンショット3.42 2026-03-29 180556.png',
          }
        ]
      },
    ]
  },
  {
    id: SectionType.CHECK,
    title: {
      ja: '4. [不良]{ふりょう}（だめなもの）',
      en: '4. Defects (NG)',
      vi: '4. Hàng lỗi (NG)',
      pt: '4. Defeitos (NG)',
      tl: '4. Mga Depekto (NG)',
      id: '4. Produk Cacat (NG)',
      ne: '4. दोषहरू (NG)'
    },
    icon: '⚠️',
    pages: [
      {
        id: 'defect-input',
        pdfPage: 35,
        title: {
          ja: '[不良]{ふりょう}（だめなもの）を いれる',
          en: 'Input Defects',
          vi: 'Nhập hàng lỗi',
          pt: 'Inserir Defeitos',
          tl: 'I-input ang mga Depekto',
          id: 'Input Produk Cacat',
          ne: 'दोषहरू इनपुट गर्नुहोस्'
        },
        content: {
          ja: '[不良]{ふりょう}（だめなもの）が [出]{で}たときに おこないます।',
          en: 'Used when defective products are produced.',
          vi: 'Sử dụng khi có sản phẩm lỗi được sản xuất.',
          pt: 'Usado quando produtos defeituosos são produzidos.',
          tl: 'Ginagamit kapag may mga depektibong produkto na ginawa.',
          id: 'Digunakan saat produk cacat diproduksi.',
          ne: 'दोषपूर्ण उत्पादनहरू उत्पादन गर्दा प्रयोग गरिन्छ।'
        },
        steps: [
          {
            number: 1,
            title: {
              ja: '「[不良]{ふりょう}」を おす',
              en: 'Press "Defect"',
              vi: 'Nhấn "Hàng lỗi"',
              pt: 'Pressione "Defeito"',
              tl: 'Pindutin ang "Defect"',
              id: 'Tekan "Produk Cacat"',
              ne: '"दोष" थिच्नुहोस्'
            },
            description: {
              ja: '[画面]{がめん}の [下]{した}にある「[不良]{ふりょう}」タブを タップします।',
              en: 'Tap the "Defect" tab at the bottom of the screen.',
              vi: 'Chạm vào tab "Hàng lỗi" ở cuối màn hình.',
              pt: 'Toque na aba "Defeito" na parte inferior da tela.',
              tl: 'I-tap ang tab na "Defect" sa ibaba ng screen.',
              id: 'Ketuk tab "Produk Cacat" di bagian bawah layar.',
              ne: 'स्क्रिनको तल रहेको "दोष" ट्याब ट्याप गर्नुहोस्।'
            },
            image: '/photo/4/スクリーンショット4.11 2026-03-29 181559.png',
          },
          {
            number: 2,
            title: {
              ja: '[理由]{りゆう}を [選]{えら}ぶ',
              en: 'Select Reason',
              vi: 'Chọn lý do',
              pt: 'Selecionar motivo',
              tl: 'Pumili ng Dahilan',
              id: 'Pilih Alasan',
              ne: 'कारण छान्नुहोस्'
            },
            description: {
              ja: '「キズ」「シルバー」「[異物]{いぶつ}」など、だめだった[理由]{りゆう}を タップします।',
              en: 'Tap the reason for the defect, such as "Scratch", "Silver", or "Foreign Object".',
              vi: 'Chạm vào lý do lỗi, chẳng hạn như "Vết trầy", "Bạc", hoặc "Vật lạ".',
              pt: 'Toque no motivo do defeito, como "Arranhão", "Prata" ou "Objeto Estranho".',
              tl: 'I-tap ang dahilan ng depekto, gaya ng "Scratch", "Silver", o "Foreign Object".',
              id: 'Ketuk alasan cacat, seperti "Goresan", "Perak", atau "Benda Asing".',
              ne: 'दोषको कारण ट्याप गर्नुहोस्, जस्तै "कोर्नु", "चाँदी", वा "विदेशी वस्तु"।'
            },
            image: '/photo/4/スクリーンショット4.12 2026-03-29 181928.png',
          },
          {
            number: 3,
            title: {
              ja: '[数]{かず}を いれて「[登録]{とうろく}」する',
              en: 'Enter Number and "Register"',
              vi: 'Nhấn "Hàng lỗi"',
              pt: 'Pressione "Defeito"',
              tl: 'Pindutin ang "Defect"',
              id: 'Tekan "Produk Cacat"',
              ne: '"दोष" थिच्नुहोस्'
            },
            description: {
              ja: '[数]{かず}を いれて「ENTER」を おし、[最後]{さいご}に「[登録]{とうろく}」を タップします।',
              en: 'Enter the number, press "ENTER", and finally tap "Register".',
              vi: 'Nhập số, nhấn "ENTER", và cuối cùng chạm vào "Đăng ký".',
              pt: 'Insira o número, pressione "ENTER" e, finalmente, toque em "Registrar".',
              tl: 'Ilagay ang numero, pindutin ang "ENTER", at sa huli ay i-tap ang "Register".',
              id: 'Masukkan nomor, tekan "ENTER", dan terakhir ketuk "Daftar".',
              ne: 'नम्बर प्रविष्ट गर्नुहोस्, "ENTER" थिच्नुहोस्, र अन्तमा "दर्ता गर्नुहोस्" ट्याप गर्नुहोस्।'
            },
            image: '/photo/4/スクリーンショット4.13 2026-03-29 182921.png',
          }
        ]
      },
    ]
  },
`;

    content = content.slice(0, prevLine) + replacement + content.slice(nextLine);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("Success");
} else {
    console.log("Markers not found: start=" + section2Start + ", end=" + adminSectionStart);
}
