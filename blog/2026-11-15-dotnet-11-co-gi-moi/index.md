---
slug: dotnet-11-co-gi-moi
title: ".NET 11 đã phát hành: C# 15 có union types, Runtime Async và nhiều cải tiến hiệu năng"
authors: [tiennhm]
tags: [dotnet, csharp, chia-se-kien-thuc]
description: ".NET 11 vừa chính thức phát hành cùng C# 15. Điểm nhanh những thay đổi đáng chú ý: union types, collection expression arguments, Runtime Async, JIT nhanh hơn, và một lưu ý quan trọng về yêu cầu phần cứng."
---
.NET 11 vừa phát hành bản chính thức (GA), đi kèm **C# 15** là phiên bản ngôn ngữ mặc định cho project nhắm tới `net11.0`. Bài này điểm nhanh những thay đổi đáng chú ý nhất để các bạn biết có gì đáng thử.

<!--truncate-->

## C# 15: các tính năng ngôn ngữ mới

### Union types

Cuối cùng C# cũng có union: một giá trị có thể là một trong vài kiểu cố định, và compiler kiểm tra `switch` đã đủ trường hợp hay chưa (exhaustiveness).

```csharp
public record class Cat(string Name);
public record class Dog(string Name);
public record class Bird(string Name);

public union Pet(Cat, Dog, Bird);

Pet pet = new Dog("Rex");
string name = pet switch
{
    Dog d => d.Name,
    Cat c => c.Name,
    Bird b => b.Name,   // thiếu một case là compiler báo ngay
};
```

### Collection expression arguments

Truyền tham số cho constructor ngay trong collection expression, ví dụ đặt capacity hoặc comparer:

```csharp
List<string> names = [with(capacity: values.Length * 2), .. values];
HashSet<string> set = [with(StringComparer.OrdinalIgnoreCase), "Hello", "HELLO", "hello"];
```

### Những thay đổi nhỏ nhưng tiện

- **Closed hierarchies**: `closed record class` giới hạn các lớp con, kết hợp tốt với `switch` kiểm tra đủ trường hợp.
- **Extension indexers**: thêm indexer `this[int index]` cho kiểu có sẵn qua extension block.
- **Labeled break/continue**: thoát hoặc tiếp tục vòng lặp ngoài từ vòng lặp lồng nhau bằng nhãn, như `continue outer;`.
- **Memory safety** (đang ở dạng **preview**): cần đặt `LangVersion` là `preview`, chưa nên dùng cho production.

## Runtime và hiệu năng

- **Runtime Async**: async được runtime hỗ trợ trực tiếp, cho stack trace dễ đọc hơn và giảm overhead. Thư viện runtime đã được biên dịch với tính năng này. Trước khi bật cho project của bạn, hãy kiểm tra lại tài liệu về cấu hình mặc định.
- **JIT thông minh hơn**: loại bỏ bounds check, devirtualization tốt hơn, gộp switch expression, constant folding cho so sánh chuỗi.
- **Phần cứng**: thêm Arm SVE2, AVX-VNNI-512, `Half` dùng FP16 phần cứng.
- **Linux**: `Guid.NewGuid()` dùng `getrandom()`, nhanh hơn khoảng 12% theo tài liệu của Microsoft.
- **Crash report trong process**: bật bằng biến môi trường `DOTNET_EnableCrashReport=1`.

:::warning Yêu cầu phần cứng cao hơn
Trên x86/x64, mức tối thiểu tăng từ x86-64-v1 lên **x86-64-v2**. CPU quá cũ sẽ không chạy được .NET 11. Nếu bạn deploy lên máy ảo hoặc máy cũ, hãy kiểm tra trước khi nâng cấp.
:::

## Thư viện

- `System.Text.Json` hỗ trợ union và xuất JSONL.
- Thêm `Decimal32/64/128`, nén **Zstandard** trong `System.IO.Compression`.
- LINQ có `FullJoin` và các overload Join/GroupJoin cho tuple.
- Một số API mật mã mới (X25519), và vài API thử nghiệm như composite ML-KEM, HPKE.

## SDK và công cụ

- `dotnet run -e KEY=VALUE` để truyền biến môi trường khi chạy.
- File-based apps hỗ trợ `#:include`.
- `dotnet test` có `--timeout`, `--no-dependencies`, thêm template xUnit v3 và NUnit.
- `dotnet sln` hỗ trợ solution filter `.slnf`.
- NativeAOT CLI và MSBuild server được bật mặc định.

## Nên làm gì tiếp?

1. Cài .NET 11 SDK tại [dotnet.microsoft.com/download/dotnet/11.0](https://dotnet.microsoft.com/download/dotnet/11.0).
2. Thử đổi `TargetFramework` sang `net11.0` trong một project nhỏ, chạy test và xem warning mới.
3. Thử union types với một bài toán thật, ví dụ kết quả `Success | Error`.
4. Đọc thêm các trang chính thức bên dưới, đặc biệt phần breaking changes trước khi nâng cấp project lớn.

## Nguồn tham khảo

- [What's new in .NET 11](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-11/overview)
- [What's new in the .NET 11 runtime](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-11/runtime)
- [What's new in C# 15](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-15)
