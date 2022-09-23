package com.example.demo.controller;

import com.example.demo.dto.ImageDto;
import com.example.demo.mapper.testmapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class TestController {
    private final testmapper testmapper;
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String test() {
        return "testttt";
    }

    @PostMapping("/upload") //포스트맨으로 파일 보내면 디렉토리에 저장
    public String saveFile(@RequestParam String itemName, @RequestParam MultipartFile file) throws IOException {
        System.out.println(file.getOriginalFilename());
//        System.out.println(file.getContentType());
//        StringTokenizer st = new StringTokenizer(file.getContentType(),"/");
//        st.nextToken();
        file.transferTo(new File("C:\\Users\\multicampus\\Documents\\fileTest\\"+file.getOriginalFilename()));
        return "return";
    }

    @PostMapping("/imgtest1")   //포스트맨으로 파일 보내면 flask에서 처리 후 이미지 받아서 디렉토리와 db에 저장, 계산 결과값 리턴
    public String imgtest1(@RequestParam MultipartFile file) throws IOException, ParseException {
        //System.out.println(file.getOriginalFilename());
        //file.transferTo(new File("C:\\Users\\multicampus\\Documents\\fileTest\\"+file.getOriginalFilename()));

        //flask 서버로 요청 관련 변수 설정
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        //포스트맨에서 전송받은 파일을 요청 파라미터에 추가
        MultiValueMap<String, Object> body  = new LinkedMultiValueMap<>();body.add("file", file.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        //flask 서버로 요청 보냄
        ResponseEntity<String> response2 = rt.postForEntity("http://localhost:5002/imgtest", requestEntity, String.class);
//        System.out.println(response2.getBody());
//        System.out.println(response2);

        //받은 json 응답을 파싱
        JSONParser jsonParse = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParse.parse(response2.getBody());
        String image = (String) jsonObj.get("img");
        String text = (String) jsonObj.get("text");


        String path="C:\\Users\\multicampus\\Documents\\fileTest\\";

        //경로 파일명 중복 방지용 식별자 생성
        UUID uuid = UUID.randomUUID();
        String filepath=path+ uuid +"_"+file.getOriginalFilename();

        //base64 형태로 받은 이미지를 bytearray로 변환하고 설정한 파일 경로에 저장
        ByteArrayResource resource = new ByteArrayResource(javax.xml.bind.DatatypeConverter.parseBase64Binary(image.toString()));
        File targetFile = new File(filepath);
        java.nio.file.Files.copy(
                resource.getInputStream(),
                targetFile.toPath(),
                StandardCopyOption.REPLACE_EXISTING);
        IOUtils.closeQuietly(resource.getInputStream());

        //db에 파일 정보 저장
        ImageDto imageDto=new ImageDto();
        imageDto.setImageName(file.getOriginalFilename());
        imageDto.setPath(filepath);
        testmapper.imageInsert(imageDto);

        //일치할 확률 text 응답으로 반환
        return text.toString();
    }

    @GetMapping("/download")    //파일 이름을 입력하면 디렉토리에 있는 해당 파일 다운로드 형식으로 프론트로 보냄  - 포스트맨 send버튼 대신 send and download 버튼으로 테스트
    public ResponseEntity<Resource> downloadFile(@RequestParam String imageName) throws IOException {

        //DB조회
        ImageDto image = testmapper.imageSelect(imageName);

        UrlResource resource = new UrlResource("file:" + image.getPath());

        //한글 파일 이름이나 특수 문자의 경우 깨질 수 있으니 인코딩 한번 해주기
        String encodedUploadFileName = UriUtils.encode(image.getImageName(),
                StandardCharsets.UTF_8);

        //아래 문자를 ResponseHeader에 넣어줘야 한다. 그래야 링크를 눌렀을 때 다운이 된다.
        //정해진 규칙이다.
        String contentDisposition = "attachment; filename=\"" + encodedUploadFileName + "\"";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(resource);
    }

    @GetMapping("/sendImage")   //이미지 base64형태로 전송
    public String sendByteImage(@RequestParam String imageName) throws IOException {

        //DB조회
        ImageDto image = testmapper.imageSelect(imageName);

        //base64로 인코딩
        byte[] fileContent = FileUtils.readFileToByteArray(new File(image.getPath()));
        String encodedString = Base64.getEncoder().encodeToString(fileContent);


        return encodedString;
    }
}
